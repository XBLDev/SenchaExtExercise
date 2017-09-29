import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { Button, FormPanel, PasswordField, Container, TextField} from '@extjs/ext-react';
// import { connect } from 'react-redux';
// import { updateCriteria } from './actions';
import EmployeesGrid from './EmployeesGrid';

Ext.require([
    'Ext.Function'
]);

// Set up a model to use in our Store
// Ext.define('User', {
//     extend: 'Ext.data.Model',
//     fields: [
//         {name: 'userName', type: 'string'},

//     ]
// });


class Loginpage extends Component {


  constructor(props) {
    super(props);
    this.state = { 
        currentUserName: 'jack', 
        currentUserPW: 'jack',
        currentLoginMsg: '',
        hasUser: false
    }
    // this.text = 'haha';
    this.handlepasswordfieldChange = this.handlepasswordfieldChange.bind(this);
    this.handleUsernamefieldChange = this.handleUsernamefieldChange.bind(this);

    this.tempfunc = this.tempfunc.bind(this);
    this.userlogin = this.userlogin.bind(this);
    this.userlogout = this.userlogout.bind(this);



    // this.handlepasswordfieldChange = this.handlepasswordfieldChange.bind(this);
    
    // this.handleSubmit = this.handleSubmit.bind(this);
  }


    store3 = Ext.create('Ext.data.Store', {
        fields: 
        [
            {name: 'id', type: 'integer'},                                    
            {name: 'username', type: 'string'},
            {name: 'password', type: 'string'},            
            {name: 'salt', type: 'string'},            
                        
        ],
        // autoLoad: true,
        // remoteSort: true,
        remoteFilter: true,
        pageSize: 100,
        proxy: {
            type: 'rest',
            url: '/login',
            reader: {
                type: 'json',
                rootProperty: 'users',
                totalProperty: 'total'
            }
        }
    });




    store2 = new Ext.data.Store({
        fields: [
            {name: 'userName', type: 'string'},            
        ],  
        // sorters: [{
        //     property: 'age',
        //     direction: 'DESC'
        // }, {
        //     property: 'firstName',
        //     direction: 'ASC'
        // }],

        filters: 
        [
        {
            property: 'userName',
            value: 'jack'
        },
        {
            property: 'password',
            value: 'jack'
        }                
        ]
    });

    store = Ext.create('Ext.data.Store', {
            fields: [
                {name: 'userName', type: 'string'},
            ],  
            filters:[
                {
                    property: 'userName',
                    // value: 'jack'                 

                    value: 'jack'                 
                },
                {
                    property: 'password',
                    // value: 'jack'                 

                    value: 'jack'          
                }                
            ],
            // autoLoad: true,
            // remoteSort: true,
            // remoteFilter: true,
            // pageSize: 100,
            proxy: {
                type: 'rest',
                url: '/login',
                reader: {
                    type: 'json',
                    rootProperty: 'users',
                }
            }
        });



    // loginForm = new FormPanel();
    // this.loginForm.
    render() {
    // let currentRendered = this.state.hasUser? {}:{};  
    // let layoutPattern = this.state.hasUser == true? "fit":"center";
    
    return (
        <Container layout="fit">
            {this.state.hasUser == false?
            (
            <FormPanel shadow title="User Log In" width={400} scrollable={false} >
                <TextField label="Username" id="currentUserName" width={400} onChange={this.handleUsernamefieldChange} value="jack"/>
                <PasswordField
                    id="currentUserPw"
                    value="jack"
                    width={400}
                    onChange={this.handlepasswordfieldChange}
                    label="Password"
                    required
                    revealable
                />
                <TextField id="currentLoginMsgField" width={400} value={this.state.currentLoginMsg} />
                
                <Button id="loginbutton" text="Login" handler={this.userlogin} width={400}/>

            </FormPanel>
            
            )
            :
            (
                <EmployeesGrid shadow/>

            )}

            {/* {this.state.hasUser == true?
            (
                <FormPanel shadow width={400} scrollable={false} >
                    <Button id="logoutbutton" text="Logout" handler={this.userlogout} width={400}/>
                </FormPanel>
            )
            :
            (
                <Container></Container>
            )
            } */}
        </Container>    

    )
    
    }

    tempfunc(field, newvalue, oldvalue, eOpts){
         this.setState({ currentUserPW: field.getValue() });
         

    }

     userlogout(){
        this.setState({ hasUser: false });

     }

     userlogin(){

        // this.setState({ hasUser: true });
        // console.log('store filters',this.store.getFilters());

        // const filters = [];
        // filters.push({
        //     property: 'userName',
        //     // value: 'jack'                 

        //     value: this.state.currentUserName                   
        // });
        // filters.push({
        //     property: 'password',
        //     // value: 'jack'
        //     value: this.state.currentUserPW                 
        // });  
        // this.store.addFilter(filters, false);


        const filters2 = [];
        filters2.push({
            property: 'userName',
            // value: 'jack'                 

            value: this.state.currentUserName            

            // value: this.state.currentUserName                   
        }); 
        filters2.push({
            property: 'password',
            // value: 'jack'
            value: this.state.currentUserPW                 
        });          
        
        this.store3.addFilter(filters2, false);

        // this.store.filter(filters);
        // console.log('added filters');
        
        // this.store.filters = filters;
        // console.log('store filters',this.store.getFilters());

        this.store3.load({
            // params: {
            //     group: 3,
            //     type: 'user'
            // },
            // filters: 
            // [
            // {
            //     property: 'userName',
            //     value: 'jack'
            // },
            // {
            //     property: 'password',
            //     value: 'jack'              
            // }
        
            // ],            
            callback: function(records, operation, success) {
                // do something after the load finishes
                
                // console.log(success);
                if(success == true)
                {
                    console.log(records.length);

                    if(records.length > 0)
                    {
                        this.setState({ hasUser: true });
                        console.log('login success');
                    }
                    else
                    {
                        this.setState({ currentLoginMsg: 'User Auth Failed, try again' });                        
                        console.log('query success but no record found with the given password and username');
                    }


                }
                else
                {
                    console.log('login failed');
                }
                
            },
            scope: this
        });

        //  let myStore = new Ext.data.Store({
        //         model: 'User',
        //         filters: 
        //         [
        //         {
        //             property: 'userName',
        //             value: this.state.currentUserName
        //         },
        //         {
        //             property: 'password',
        //             value: this.state.currentUserPW                   
        //         }
            
        //         ],

        //         proxy: {
        //             type: 'ajax',
        //             url: '/login',
        //             reader: {
        //                 type: 'json',
        //                 rootProperty: 'users'
        //             }
        //         },
        //         autoLoad: true
        //     });
     }

     handlepasswordfieldChange(field, newvalue, oldvalue, eOpts){
         this.setState({ currentUserPW: field.getValue() });

     }

     handleUsernamefieldChange(field, newvalue, oldvalue, eOpts){
         this.setState({ currentUserName: field.getValue() });

     }

}

export default Loginpage;