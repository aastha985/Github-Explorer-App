import React from 'react';

export default class TestComponent extends React.PureComponent{
    constructor(props){
        super(props);

        console.log("I am in Constructor");
    }
    static getDerivedStateFromProps(props,state){
        console.log("I am in getDerivedStateFromProps");

        return { pageSize: props.pageSize };
    }
    componentDidMount(){
        console.log("I am in componentDidMount");
    }
    // shouldComponentUpdate(){
    //     console.log("I am in shouldComponentUpdate");
    //     return true;
    // }
    static getSnapshotBeforeUpdate(prevProps,prevState){
        console.log("I am in getSnapshotBeforeUpdate");
    }
    componentDidUpdate(){
        console.log("I am in componentdidUpdate");
    }
    componentWillUnmount(){
        console.log("Going to be removed");
    }
    render(){
        console.log("I am render function");
        return "I am render function";
    }
}