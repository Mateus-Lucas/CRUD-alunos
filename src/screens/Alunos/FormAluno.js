import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'
import { Picker } from '@react-native-picker/picker';

export default function FormAluno({ navigation, route }) {
    const { acao, aluno: alunoAntigo } = route.params
    const [nome, setNome] = useState('')
    const [matricula, setMatricula] = useState('')
    const [curso, setCurso] = useState('')
    const [turno, setTurno] = useState('Matutino') // Defina um valor padrão para o Picker

    const [showMensagemErro, setShowMensagemErro] = useState(false)

    useEffect(() => {
        console.log('aluno -> ', alunoAntigo)
        if (alunoAntigo) {
            setNome(alunoAntigo.nome)
            setMatricula(alunoAntigo.matricula)
            setCurso(alunoAntigo.curso)
            setTurno(alunoAntigo.turno)
        }
    }, [])

    function salvar() {
        if (nome === '' || matricula === '' || curso === '' || turno === '') {
            setShowMensagemErro(true)
        } else {
            setShowMensagemErro(false)

            const novoAluno = {
                nome: nome,
                matricula: matricula,
                curso: curso,
                turno: turno
            }

            if (alunoAntigo) {
                acao(alunoAntigo, novoAluno)
            } else {
                acao(novoAluno)
            }

            Toast.show({
                type: 'success',
                text1: 'Aluno salvo com sucesso!'
            })

            navigation.goBack()
        }
    }

    return (
        <View style={styles.container}>
            <Text variant='titleLarge' style={styles.title}>{alunoAntigo ? 'Editar aluno' : 'Adicionar aluno'}</Text>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    label={'Nome'}
                    mode='outlined'
                    value={nome}
                    onChangeText={text => setNome(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />
                <TextInput
                    style={styles.input}
                    label={'Matrícula'}
                    mode='outlined'
                    keyboardType='numeric'
                    value={matricula}
                    onChangeText={text => setMatricula(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />
                <TextInput
                    style={styles.input}
                    label={'Curso'}
                    mode='outlined'
                    keyboardType='outlined'
                    value={curso}
                    onChangeText={text => setCurso(text)}
                    onFocus={() => setShowMensagemErro(false)}
                />
                <Picker
                    style={styles.inputPicker}
                    selectedValue={turno}
                    onValueChange={(itemValue) =>
                        setTurno(itemValue)
                    }>
                    <Picker.Item label="Matutino" value="Matutino" />
                    <Picker.Item label="Vespertino" value="Vespertino" />
                    <Picker.Item label="Noturno" value="Noturno" />
                </Picker>
                {showMensagemErro &&
                    <Text style={{ color: 'red', textAlign: 'center' }}>Preencha todos os campos!</Text>
                }
            </View>
            <View style={styles.buttonContainer}>
                <Button
                    style={styles.button}
                    mode='contained-tonal'
                    onPress={() => navigation.goBack()}
                >
                    Voltar
                </Button>
                <Button
                    style={styles.button}
                    mode='contained'
                    onPress={salvar}
                >
                    Salvar
                </Button>
            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    title: {
        fontWeight: 'bold',
        margin: 10
    },
    inputContainer: {
        width: '90%',
        flex: 1
    },
    input: {
        margin: 10
    },
    inputPicker: {
        backgroundColor: '#eee', // Cor de fundo
    },
    buttonContainer: {
        flexDirection: 'row',
        width: '90%',
        gap: 10,
        marginBottom: 10
    },
    button: {
        flex: 1
    }
})
