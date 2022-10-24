import React from 'react';
import {View, Text, StyleSheet, SafeAreaView, StatusBar, Platform} from "react-native";
import { Camera } from 'expo-camera';
import * as FaceDetector from 'expo-face-detector';
import * as Permissions from 'expo-permissions';

export default class Main extends React.Component{
    constructor(){
        super()
        this.state = {
            hasCameraPermission: null,
            faces: [],
        }
    }
    ComponentDidMount(){
        Permissions.askAsync(Permissions.CAMERA).then(this.onCameraPermission)
    }
    onCameraPermission=(status)=>{
        this.setState({
            hasCameraPermission: status.status === 'granted'
        })
    
    }
    handleFacesDetected=(faces)=>{
        this.setState({
            faces:faces

        })

    }
    detectError=(error)=>{
        console.log(error)

    }
    render(){
        const {hasCameraPermission} = this.state
        if(hasCameraPermission === null){
            return
            <View>

            </View>
        }
        if(hasCameraPermission === false){
            return(
            <View style = {styles.container}>
                <Text> Access Denied</Text>
            </View>
            )
            
        }
        console.log(this.state.faces)
        return(
            <View style = {styles.container}>
                <SafeAreaView style = {styles.droidSafeArea}>

                </SafeAreaView>
                <View style = {styles.headingContainer}>
                    <Text style = {styles.titleText}>
                        Face Detection
                    </Text>

                </View>
                <View style = {styles.cameraStyle}>
                <Camera
                    // other props
                    onFacesDetected={this.handleFacesDetected}
                    onFacesDetectionError = {this.detectError}
                    faceDetectorSettings={{
                        mode: FaceDetector.FaceDetectorMode.fast,
                        detectLandmarks: FaceDetector.FaceDetectorLandmarks.all,
                        runClassifications: FaceDetector.FaceDetectorClassifications.all,
                        minDetectionInterval: 100,
                        tracking: true,
                    }}
                />

                </View>


            </View>
        )
    }

}
const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    droidSafeArea: {
        marginTop: Platform.OS === "android" ? StatusBar.currentHeight : 0
    },
    headingContainer: {
        flex: 0.1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    titleText: {
        fontSize: 30
    },
    cameraStyle: {
        flex: 0.65
    },
    filterContainer: {},
    actionContainer: {}
});