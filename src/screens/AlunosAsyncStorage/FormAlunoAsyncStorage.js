import React, { useEffect, useState } from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Text, TextInput } from 'react-native-paper'
import Toast from 'react-native-toast-message'

export default function FormAlunoAsyncStorage({ navigation, route }) {

  const { acao, aluno: alunoAntigo } = route.params

  const [nome, setNome] = useState('')
  const [matricula, setMatricula] = useState('')
  const [curso, setCurso] = useState('')
  const [turno, setTurno] = useState('')

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

      const objetoEmString = JSON.stringify(novoAluno)
      console.log("🚀 ~ file: Formaluno.js:47 ~ salvar ~ objetoEmString:", objetoEmString)

      console.log(typeof (objetoEmString))

      const objeto = JSON.parse(objetoEmString)
      console.log("🚀 ~ file: Formaluno.js:52 ~ salvar ~ objeto:", objeto)

      console.log(typeof (objeto))


      if (alunoAntigo) {
        acao(alunoAntigo, novoAluno)
      } else {
        acao(novoAluno)
      }



      Toast.show({
        type: 'success',
        text1: 'aluno salvo com sucesso!'
      })

      navigation.goBack()
    }

  }


  return (
    <View style={styles.container}>

      <Text variant='titleLarge' style={styles.title} >{alunoAntigo ? 'Editar aluno' : 'Adicionar aluno'}</Text>

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
          value={curso}
          onChangeText={text => setCurso(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

        <TextInput
          style={styles.input}
          label={'Turno'}
          mode='outlined'
          value={turno}
          onChangeText={text => setTurno(text)}
          onFocus={() => setShowMensagemErro(false)}
        />

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