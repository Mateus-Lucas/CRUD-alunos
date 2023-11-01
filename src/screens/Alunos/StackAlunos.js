import { createStackNavigator } from '@react-navigation/stack'
import FormAluno from './FormAluno.js'
import ListaAlunos from './ListaAlunos.js'

const Stack = createStackNavigator()

export default function StackAlunos() {
    return (
        <Stack.Navigator
            screenOptions={{ headerShown: false }}
            initialRouteName='ListaAlunos'
        >
            <Stack.Screen name='ListaAlunos' component={ListaAlunos} />
            <Stack.Screen name='FormAluno' component={FormAluno} />
        </Stack.Navigator>

    )
}