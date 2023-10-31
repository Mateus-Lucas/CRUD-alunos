import { createDrawerNavigator } from '@react-navigation/drawer'
import React from 'react'
import Home from '../screens/Home'
import StackAlunosAsyncStorage from '../screens/AlunosAsyncStorage/StackAlunosAsyncStorage'

const Drawer = createDrawerNavigator()

export default function DrawerRoutes() {
    return (
        <Drawer.Navigator initialRouteName='Alunos'>
            <Drawer.Screen name="Home" component={Home} />
            <Drawer.Screen name="Alunos" component={StackAlunosAsyncStorage} />
        </Drawer.Navigator>

    )
}