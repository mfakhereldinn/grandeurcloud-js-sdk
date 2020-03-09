
# Grandeur Cloud [![Version](https://travis-ci.org/joemccann/dillinger.svg?branch=master)](https://cloud.grandeur.tech)

We are making it easier for you to build internet of things based smart products with our cloud platform and software development kit. [Let`s Sign Up] and create something amazing rightnow!

# JavaScript SDK

JavaScript SDK provides functions which will be used to communicate with **Grandeur Cloud** from the front-end of your application.
JavaScript SDK currently supports 3 modules.


# Table of Contents

- [Get Started](#get-started)
- [Documentation](#documentation)
    * [Init](#init)
    * [Auth](#auth)
        + [Register](#register)
        + [Login](#login)
        + [Is Authenticated](#is-authenticated)
        + [Logout](#logout)
    * [Device](#device)
        + [Pair Device](#pair-device)
        + [Unpair Device](#unpair-device)
        + [Get User Devices](#get-user-devices)
        + [Get Online Devices Count](#get-online-devices-count)
        + [Get Device Summary](#get-device-summary)
        + [Get Device Parms](#get-device-parms)
        + [Set Device Summary](#set-device-summary)
        + [Set Device Parms](#set-device-parms)
        + [Get Device Details](#get-device-details)
        + [Set Device Name](#set-device-name)
        + [Get Device Status](#get-device-status)
    * [Storage](#storage)
        + [Upload File](#upload-file)
        + [Get File Url](#get-file-url)


# Get Started
To get started with **Apollo JavaScript SDK**, you first need to add a reference link to CDN file.
For example :

```javascript
<script src="https://xyz.com/grandeur.apollo.js">
// place this tag at the end of your body.
</script>
```
Now you can create a new **Apollo** project with a API-KEY which can be accessed after creating a new account at Grandeur Cloud Dashbaord.
How to do that? Here is an example for you.

```javascript
var apolloProject = apollo.init("YOUR-APIKEY-HERE");
// initalize's your project with your API key.
```

Now you can access all the amazing features of Grandeur Cloud and can change the world!

# Documentation

## Init
In order to initalize your project and get your first device online you first need to have your API key which you can fetch from **Grandeur Cloud Dashboard**.  
A valid API resembles this format `ck412ssij0007xr239uos8jfk` , if your API key looks like this then you are good to go.  
Now you can create a new project my simply writing a single line of code. Here it is :

```javascript
var apolloProject = apollo.init("YOUR-APIKEY-HERE");
// initalize's your project with your API key.
```

## Auth
Auth provides a basic functionality for admin to authenticate a user to **Grandeur Cloud**.
**Auth** can be used simply by calling `.auth()` of **apolloProject** created above.

```javascript
var auth = apolloProject.auth();
// creates an auth object which can
// be used further.
```

We will see more in the examples below.
### Register
> register( email : *string*, password : *string*, displayName : *string*, phone : *string*) : returns *Promise*

Register a new user in a single step with this function. You just need to pass user's credentials and you are good to go.

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>email</td>
    <td><em>string</em></td>
    <td>a formatted email address</td>
  </tr>
  <tr>
    <td>password</td>
    <td><em>string</em></td>
    <td>minimum 6 characters long</td>
  </tr>
  <tr>
    <td>displayName</td>
    <td><em>string</em></td>
    <td>accepts only string</td>
  </tr>
  <tr>
    <td>phone</td>
    <td><em>string</em></td>
    <td>phone number must starts with country code i.e +923331234567</td>
  </tr>
</table>

```javascript
var auth = apolloProject.auth();

// confrim registratin module will 
// be saved in this object.
var confirmRegistration = null;

auth.register(email, password, displayName, phone).then((res) => {
    console.log(res);
    // response can be fetched here.
    // response codes are given below
    if(res.code=="PHONE-CODE-SENT") {
        // one time authorization code has been sent

        // confirm object can be fetched here
        confirmRegistration = res.confirm ;
    }
});
```
<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>PHONE-CODE-SENT</td>
<td>Verification code is sent to the phone number.</td>
</tr>
<tr>
<td>PHONE-NUMBER-INVALID</td>
<td>Phone number entered is invalid.</td>
</tr>
<tr>
<td>AUTH-ACCOUNT-DUPLICATE</td>
<td>A profile already exists with this email.</td>
</tr>
<tr>
<td>DATA-INVALID</td>
<td>Both email and password need to have a valid format.</td>
</tr>
</table>

Now after fetching code from the user, *confirmRegistration* can be called.
#### Confirm Registration
> confirmRegistration (code : *string*) : returns *Promise*
 
 Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>code</td>
    <td><em>string</em></td>
    <td>code fetched from the user</td>
  </tr>
</table>

 ```javascript 
confirmRegistration(code).then((res) => {
    console.log(res);
    // response can be fetched here.
    // response codes are given below
});
 ```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>AUTH-ACCOUNT-REGISTERED</td>
<td>User's profile is successfully created.</td>
</tr>
<tr>
<td>PHONE-CODE-VERIFICATION-FAILED</td>
<td>An unknown error occurred at the server while verifying user's code.</td>
</tr>
</table>

### Login

> login ( email: *string*, password: *string*) : returns *Promise*

Loging in the user is the basic functionality of authentication so we made
it easier for you.
In order to **login** you just have to pass email and password to the login() function.  


Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>email</td>
    <td><em>string</em></td>
    <td>a formatted email address</td>
  </tr>
  <tr>
    <td>password</td>
    <td><em>string</em></td>
    <td>minimum 6 characters long</td>
  </tr>
</table>

```javascript
var auth = apolloProject.auth();
auth.login(email,password).then((res) => {
    console.log(res);
    // response can be fetched here.
    // response codes are given below
});
```

<table>
  <tr>
    <th>Response Code</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>AUTH-ACCOUNT-LOGGEDIN</>
    <td>User is successfully logged into its account</td>
  </tr>
  <tr>
    <td>AUTH-ACCOUNT-LOGIN-FAILED</td>
    <td>User could not be logged into its account.</td>
  </tr>
  <tr>
    <td>AUTH-ACCOUNT-INVALID-PASSWORD</td>
    <td>Password entered by the user is incorrect.</td>
  </tr>
  <tr>
    <td>DATA-INVALID</td>
    <td>Both email and password need to have a valid format.</td>
  </tr>
</table>

### Is Authenticated
> isAuthenticated ( ) : returns *Promise*

This function is used to check if a user is authorized or not. It returns a respose with user profile if user is authorized and if user is not authorized it returns a response with a code **user-unauthorized**
How to do that? Here it is : 
```javascript
var auth = apolloProject.auth();
auth.isAuthenticated().then((res) => {
    console.log(res);
     // response can be fetched here.
    // response codes are given below
});
```
<table>
 <tr>
  <th>Response Code</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>AUTH-AUTHORIZED</td>
  <td>Here's the user's data: (Data can be fetched from here) </td>
 </tr>
 <tr>
  <td>AUTH-UNAUTHORIZED</td>
  <td>You are not logged into your account.</td>
 </tr>
</table>


### Logout
> logout ( ) : returns *Promise*

This simple function is called whenever user needed to be logged out.

```javascript
var auth = apolloProject.auth();
auth.logout().then((res) => {
        // response can be fetched here.
        // response codes are given below 
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>AUTH-ACCOUNT-LOGGEDOUT</td>
<td>You are successfully Logged out of your account. </td>
</tr>
</table>

## Device
Device module provides all of the device features i.e if you want to pair or unpair a device, you need to add device module to your application.
**Device** can be used simply by calling **.device()** of **apolloProject** created above.

```javascript
var device = apolloProject.device();
// creates a device object which can
// be used further.
```

We will see that in the examples below.

### Pair Device 
> pairDevice ( deviceID: *string* ) : returns *Promise*

This function is simply used to pair a device to **Grandeur Cloud**. It asks for a **device ID** and send a request to the server to pair that specific device.  

**Parameters**
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard. </td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
device.pairDevice(deviceID).then((res) =>  {
        // response can be fetched here.
        // response codes are given below 
}); 
```

<table>
 <tr>
  <th>Response Code</th>
  <th>Description</th>
 </tr>
 <tr>
  <td>DEVICE-PAIRED</td>
  <td>Device is successfully paired with the user account. </td>
 </tr>
 <tr>
  <td>DEVICE-ALREADY-PAIRED</td>
  <td>Device is already paired. </td>
 </tr>
 <tr>
  <td>DEVICE-ID-INVALID</td>
  <td>Device ID is not registered with the project.</td>
 </tr>
 <tr>
  <td>DATA-INVALID</td>
  <td>Device ID is required for pairing it.</td>
 </tr>
</table>

### Unpair Device 
> unpairDevice ( deviceID: *string* ) : returns *Promise*

This function is simply used to unpair a device to **Grandeur Cloud (Grandeur Apollo)**. It asks for a **device ID** and send a request to the server to pair that specific device.  

**Parameters**
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
device.unpairDevice(deviceID).then((res) =>  {
        // response can be fetched here.
        // response codes are given below.
}); 
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-UNPAIRED</td>
<td>Device is successfully unpaired with the user account. </td>
</tr>
<td>DEVICE-ID-INVALID</td>
<td>Device ID is not registered with the project.</td>
</tr>
<tr>
<td>DATA-INVALID</td>
<td>Device ID is required for pairing it.</td>
</tr>
</table>

### Get User Devices 
> getUserDevices ( ) : returns *Promise*

This function returns a **list of all the paired devices** with the current** authenticated ID**.   
Here is a working example :
```javascript
var device = apolloProject.device();
device.getUserDevices().then((res) =>  {
        // response can be fetched here.
        // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICES-LIST-FETCHED</td>
<td>List of requested devices is successfully fetched.</td>
</tr>
</table>

### Get Online Devices Count 
> getOnlineDevicesCount ( ) : returns *Promise*

This function returns a **list of all the online devices** with the current **authenticated ID**.   

```javascript
var device = apolloProject.device();
device.getOnlineDevicesCount().then((res) =>  {
        // response can be fetched here.
        // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICES-ONLINE-COUNT-FETCHED</td>
<td>Number of online devices is successfully fetched.</td>
</tr>
</table>

### Get Device Summary 
> getDeviceSummary( deviceID: *string* ) : returns *Promise*

This function asks for a **device ID** and returns a payload which includes data summary of that specific device.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
device.getDeviceSummary(deviceID).then((res) =>  {
        console.log(res);
        // response can be fetched here.
        // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-SUMMARY-FETCHED</td>
<td>Summary for the device is successfully fetched.</td>
</tr>
</table>

### Get Device Parms 
> getDeviceParms( deviceID: *string* ) : returns *Promise*

This function asks for a **device ID** and returns the payload which includes all the parameters of that specific device.  

Parameters :
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard </td>
  </tr>
</table>

```javascript
var device=apolloProject.device();
device.getDeviceParms(deviceID).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-PARMS-FETCHED</td>
<td>Parms for the device are successfully fetched.</td>
</tr>
</table>

### Set Device Summary 
setDeviceSummary (deviceID : *string*, summary : *JSON-Object*) : returns *Promise*

This function asks for a **device ID** and a **JSON object** which includes summary parameters.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
  <tr>
    <td>summary</td>
    <td><em>JSON Object</em></td>
    <td>A JSON object with all the summary parameters needed to set.</td>
  </tr>
</table>

```javascript
var device=apolloProject.device();
var summary = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceSummary(deviceID, summary).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```
<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-SUMMARY-UPDATED</td>
<td>Summary for the device is successfully updated.</td>
</tr>
</table>

### Set Device Parms 
setDeviceParms (deviceID : *string*, params : *JSON-Object*) : returns *Promise*

This function asks for a **device ID** and a **JSON object** which includes device parameters needed to set.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
  <tr>
    <td>params</td>
    <td><em>JSON Object</em></td>
    <td>A JSON object with all the parameters needed to set with the values.</td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
var params = {
          voltage: 1200,
          current: 1010
        };
device.setDeviceParms(deviceID, params).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-PARMS-UPDATED</td>
<td>Parms for the device are successfully updated.</td>
</tr>
</table>


### Get Device Details 
getDeviceDetails (deviceID : *string*) : returns *Promise*

This function asks for a **device ID** and returns the payload which includes all the details of that specific device.

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
</table>

```javascript
var device=apolloProject.device();
device.getDeviceDetails(deviceID).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-DETAILS-FETCHED</td>
<td>Details of the device are successfully fetched.</td>
</tr>
</table>

### Set Device Name 
setDeviceName (deviceID : *string*, newName : *string*) : returns *Promise*

This function asks for a **device ID** and **a new name** and then it sets a new name for that specific device.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
  <tr>
    <td>newName</td>
    <td><em>string</em></td>
    <td>A new name for that device.</td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
var newName = "newDeviceName";
device.setDeviceName(deviceID, newName).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```


<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-NAME-UPDATED</td>
<td>Name of the device is successfully updated.</td>
</tr>
</table>

### Get Device Status 
getDeviceStatus (deviceID : *string*) : returns *Promise*

This function asks for a **device ID** and it returns a payload which the current device status of that specific device.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>deviceID</td>
    <td><em>string</em></td>
    <td>A device ID which you can get from dashboard.</td>
  </tr>
</table>

```javascript
var device = apolloProject.device();
device.getDeviceStatus(deviceID).then((res) =>  {
           console.log(res);
           // response can be fetched here.
           // response codes are given below.
});
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>DEVICE-STATUS-FETCHED</td>
<td>Status of the device is successfully fetched.</td>
</tr>
</table>


## Storage
This module is used to access all the storage features of **Grandeur Cloud** i.e to upload or download a file.

### Upload File 
uploadFile (file : *JSON-Object*, fileName : *string*) : returns *void*

This function asks for a **file** and **file name** and uploads that file to the server.
To upload to a file, first fetch the file with html `input` tag.

```html
<input type="file" id="file">
```
Now you can access the file and upload that easily.  

Parameters :

<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>file</td>
    <td><em>JSON-Object</em></td>
    <td>A default JSON-Object with all the file details.</td>
  </tr>
  <tr>
    <td>fileName</td>
    <td><em>string</em></td>
    <td>File name you want to save.</td>
  </tr>
</table>

```javascript
var files=apolloProject.storage();

// Fetch file data from input tag.
var file = document.getElementById("file").files[0];
var fileName = "displayPicture.jpg";

files.uploadFile(file, fileName);
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>STORAGE-FILE-UPLOADED</td>
<td>File is successfully uploaded to the project.</td>
</tr>
</table>

### Get File Url 
getFileUrl (fileName : *string*) : returns *void*

This function asks for a **file name** and gets that file from the server if that file exists.  

Parameters :
<table>
  <tr>
    <th>Name</th>
    <th>Type</th>
    <th>Description</th>
  </tr>
  <tr>
    <td>fileName</td>
    <td><em>string</em></td>
    <td>File name you want to save.</td>
  </tr>
</table>

```javascript
var files=apolloProject.storage();
// File name you want to fetch.
var fileName = "displayPicture.jpg";

files.getFileUrl(filename);
```

<table>
<tr>
<th>Response Code</th>
<th>Description</th>
</tr>
<tr>
<td>STORAGE-FILE-URL-FETCHED</td>
<td>Here is the URL to access the file.</td>
</tr>
</table>

[Let`s Sign Up]: https://cloud.grandeur.tech





