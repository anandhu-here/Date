import React, { Component, Fragment } from 'react'
import OtpInput from 'react-otp-input';
import { connect } from 'react-redux';
import { clearState } from '../../actions/clearState';
import { ValidatePhone, ValidateOTP, register, createProfile } from '../../actions/auth';
import { selfieClicked } from '../../actions/buttonActions';
import store from '../../store';
import { AiFillCamera, AiFillCloseCircle } from 'react-icons/ai';
import { withAlert } from 'react-alert'


export class Register extends Component {
    constructor(props){
        super(props);
        this.state = {
            phone:"",
            otp:"",
            page:"PHONE",
            otp_sent:false,
            otp_verified:false,
            otp_input_class:"otp-input",
            ImgSrc:null,
            file: null,
            user_name : "",
            password:"",
            DPpreview:false,
            JOB:"",
            DOB:"",
            register_update:false,
            auth_updated:false
        }
        
        
    }
    _onChange(e) {
        e.preventDefault();
    
        let reader = new FileReader();
        let file = e.target.files[0];
        console.log(file);
        reader.onloadend = () => {
          this.setState({
            file: file,
            imgSrc: reader.result,
            DPpreview:true
          });
        }
        
        reader.readAsDataURL(file)
      }
    Dp_Submit(){
        this.setState({
            DPpreview:false,
            page:"PASSWORD"
        })
        
        
    }
    // initializeMedia = () => {
    //     this.setState({ imageDataURL: null });
    
    //     if (!("mediaDevices" in navigator)) {
    //       navigator.mediaDevices = {};
    //     }
    
    //     if (!("getUserMedia" in navigator.mediaDevices)) {
    //       navigator.mediaDevices.getUserMedia = function (constraints) {
    //         var getUserMedia =
    //           navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
    
    //         if (!getUserMedia) {
    //           return Promise.reject(new Error("getUserMedia Not Implemented"));
    //         }
    
    //         return new Promise((resolve, reject) => {
    //           getUserMedia.call(navigator, constraints, resolve, reject);
    //         });
    //       };
    //     }
    
    //     navigator.mediaDevices
    //       .getUserMedia({ video: true })
    //       .then((stream) => {
    //         this.player.srcObject = stream;
    //       })
    //       .catch((error) => {
    //         console.error(error)
    //        });
    //   };
    //   deInit = () =>{
    //     const stream = this.player.srcObject;
    //     const tracks = stream.getTracks();
    //     tracks.forEach(function(track){
    //         track.stop();
    //     })
    //     this.player.srcObject = null;
    //   }
    
    //   capturePicture = () => {
    //     var canvas = document.createElement("canvas");
    //     canvas.width = this.player.videoWidth;
    //     canvas.height = this.player.videoHeight;
    //     var contex = canvas.getContext("2d");
    //     contex.drawImage(this.player, 0, 0, canvas.width, canvas.height);
    //     this.player.srcObject.getVideoTracks().forEach((track) => {
    //       track.stop();
    //     });
    //     this.setState({ imageDataURL: canvas.toDataURL('image/jpeg', 1.0) });
    //   };
    _handleSubmitPhone = (e)=>{
        e.preventDefault()
        const { phone } = this.state;
        if(phone.length > 0){
            const data = {phone:phone}
            store.dispatch(ValidatePhone(data))
        }
        else{
            alert("WTF ! ")
        }
        
    }
    handleChange = (e) =>{
        e.preventDefault()
        console.log(e.target.value)
        this.setState({
            [e.target.name]:e.target.value
        })
    }
    handleChangeOtp = otp =>{
        this.setState({
            otp:otp
        })
    }
    _handleSubmitOtp = (e) =>{
        e.preventDefault()
        const {otp, phone} = this.state;
        const data = {otp,phone}
        store.dispatch(ValidateOTP(data));
    }
    componentDidUpdate(prevProps){
        if(this.props!==prevProps){
            if(!this.state.otp_sent){
                if(this.props.validatephone.otpStatus === 'otp-created'){
                    this.setState({
                        page:"OTP",
                        otp_sent:true
                    })
                }
                
            }
            if(!this.state.otp_verified){
                if(this.props.validatephone.otpVerfiedStatus === 'otp-verified'){
                    this.setState({
                        page:"NAME",
                        otp_verified : true
                    });
                    
                }
                else if(this.props.validatephone.otpVerfiedStatus === 'failed'){

                    this.setState({
                        otp_verified:false,
                        otp_input_class:"otp-input-failed"
                    })
                }
            }
            if(!this.state.register_update){
                if(this.props.auth.newUser){
                    const { user_name,file, DOB, JOB} = this.state;
                    const formdata = new FormData();
                    formdata.append('image', file);
                    formdata.append('name', user_name);
                    formdata.append('dob', DOB);
                    formdata.append('job', JOB);
                    store.dispatch(createProfile(formdata));
    
                    this.setState({
                        register_update:true
                    })


                }
                
            }
            if(!this.state.auth_updated){
                if(this.props.auth.user === null){
                    this.setState({
                        registered:false,
                        auth_updated:true
                    })
                }
            }
            // if(!this.state.DPset){
            //     if(this.props.auth.newUser){
            //         alert("Registrayion successfull");
                    

                    // let arr = this.state.imageDataURL.split(","),
                    // type = arr[0].match(/:(.*?);/)[1],
                    // bstr = atob(arr[1]),
                    // n = bstr.length,
                    // u8arr = new Uint8Array(n);
                    // while (n--) {
                    //     u8arr[n] = bstr.charCodeAt(n);
                    // }
                    // let selfie = new File([u8arr], 'imagename', { type: type });

                    // const fd = new FormData();
                    // fd.append("image", selfie);
                    // fd.append("phone", this.props.auth.user.phone)
                    // store.dispatch(UploadDp(fd))
            //     }
            // }
            
            
        }
    }
    // componentDidMount(){
    //     store.dispatch(clearState());
    // }
    // componentWillUnmount(){
    //     store.dispatch(clearState());
    // }
    // Submit final results
    _handleSubmitFinal = (e) =>{
        e.preventDefault()
        const { phone, user_name,file, DOB, JOB, password, imageDataURL} = this.state;
        const { isAuth } = this.props.auth;
        const register_data = { phone, user_name, password };
        this.setState({
            register_update:false
        })
        store.dispatch(register(register_data));
        
        
    
    }

    
    _handleselfieClick = (e) =>{
        e.preventDefault()
        this.setState({
            selfieClicked:true
        })
        this.initializeMedia();
    }
    _handleselfieClose = () => {
        this.setState({
            selfieClicked:false
        })
        this.deInit();
        
    }
    _handleSubmitName = (e) =>{
        e.preventDefault();
        this.setState({
            page:"DOB"
        })
    }
    _handleSubmitDOB = (e) =>{
        e.preventDefault();
        this.setState({
            page:"JOB"
        });

    }
    _handleSubmitJOB = (e) =>{
        e.preventDefault();
        this.setState({
            page:"DP"
        });

    }
    continueWithSelfie = (e) =>{
        e.preventDefault()
        
        console.log("This is flattering",Boolean(this.state.imageDataURL));
        if (Boolean(this.state.imageDataURL)){
            this.setState({
                selfieClicked:false,
                page:5
            });
        }
    }
    _clearDPPreview = () =>{
        this.setState({
            imgSrc:null,
            DPpreview:false,
            file:null
        })
    }
    _setDPPreview = () =>{
        this.setState({
            DPpreview:false
        })
    }
    render() {
        const { phone, page, otp_input_class, selfieClicked } = this.state;
        
        var regInputs;
        switch (page) {
            case "PHONE":
                regInputs=(
                    <Fragment>
                    <div className="Login-heads">Please enter your phone number.</div>
                    <input 
                        className = "Login-input" 
                        value={phone}
                        placeholder="Phone"
                        name = "phone"
                        onChange = {(e)=>this.handleChange(e)}

                    />
                <input onClick={(e)=>this._handleSubmitPhone(e)} className="phone-send" value="Send phone" type="submit" />
                </Fragment>
                )
                break;
        
            case "OTP":
                regInputs = (
                    <Fragment>
                    <div className="Login-heads">Please enter the Otp we sent.</div>
                    <OtpInput
                        value={this.state.otp}
                        onChange={this.handleChangeOtp}
                        numInputs={6}
                        separator={<span>-</span>}
                        inputStyle = {otp_input_class}
                        containerStyle = "otp-container"
                    />
                <input onClick={(e)=>this._handleSubmitOtp(e)} className="otp-send" value={otp_input_class==="otp-input-failed"?"Resend Otp":"Send Otp"} type="submit" />
                </Fragment>
                )
                break;
            case "NAME":
                regInputs = (
                    <div className="Name">
                        <input onChange={(e)=>this.handleChange(e)} className="Name-input" placeholder="Enter your Name" value= {this.state.name} name="user_name"/>
                        <button onClick={(e)=>this._handleSubmitName(e)} className="Name-btn">Save</button>
                    </div>
                )
                break
            case "DOB":
                regInputs = (
                    <Fragment>
                    <div className="Login-heads">Please enter your date of birth</div>
                    <input className="dob-input" onChange={(e)=>this.handleChange(e)} name="DOB" value={this.state.DOB} type="date" />
                <input onClick={(e)=>this._handleSubmitDOB(e)} className="otp-send" value="Continue" type="submit" />
                </Fragment>
                )
                break;
            case "SELFIE":
            
                regInputs = (
                    <div className="TakeSelfie">
                        <button onClick={(e)=>this._handleselfieClick(e)} className="TakeSelfie-btn">Take a selfie</button>
                    </div>
                )
                break;
            case "JOB":
                regInputs = (
                    <Fragment>
                    <div className="Login-heads">
                    
                        What is your Proffession !
                        <i><p>We assume it would increase your chance of getting matches.</p></i>    
                    </div>
                    <input className="dob-input" onChange={(e)=>this.handleChange(e)} name="JOB" value={this.state.JOB} type="text" />
                <input onClick={(e)=>this._handleSubmitJOB(e)} className="otp-send" value="Continue" type="submit" placeholder="Your Profession" />
                </Fragment>
                )
                break;
            case "DP":
                regInputs = (
                    <Fragment>
                    <div className="Login-heads">
                    
                        Upload a picture of yours.
                        <i><p>A genuine one will increase your chance of getting matches.</p></i>    
                    </div>
                    <label  className="image-upload"><input onChange={(e)=>this._onChange(e)} type="file" accept="image/*" />Custom upload</label>
                {this.state.DPpreview?<div className="dp-preview">
                    <div className="dp-preview-delete"><AiFillCloseCircle onClick={()=>this._clearDPPreview()} className="dp-preview-delete-icon" /></div>
                    <img src={this.state.imgSrc} alt="" />
                    <div className="dp-preview-okey"><input onClick={(e)=>this.Dp_Submit(e)} className="dp-preview-okey-input" type="submit" value="Continue with this picture" /></div>
                </div>:null}
                </Fragment>
                )
                break;
            case "PASSWORD":
                regInputs = (
                    <Fragment>
                    <div className="Login-heads">Lets secure your account! please set a strong password.</div>
                        <div className = "Login-password">
                            <input name="password" onChange={(e)=>this.handleChange(e)} value={this.state.password} className="Login-password-input" type="password" placeholder="Password"></input>
                            <input onClick={(e)=>this._handleSubmitFinal(e)} className="Login-password-submit" value="Register (finally)" type="submit" />

                        </div>
                    </Fragment>
                )
                break;
            
            default:
                return null;
        }
        const Player = (
            <div className="video-div">
            <video
                id="selfie_"
                ref={(refrence) => {
                this.player = refrence;
                }}
                autoPlay
                
            ></video>
            <AiFillCamera onClick={()=>this.capturePicture()} className="capture-icon" />
            </div>
        )
        const Image = (
            <div className="captured-div">
            <img  src={this.state.imageDataURL} />
            <div className="captured-image-opt">
                <button onClick={()=>this.initializeMedia()} className="retake-selfie">Retake</button>
                <button onClick = {(e)=>this.continueWithSelfie(e)} className="upload-selfie">Continue</button>
            </div>
            </div>
        )
        var SelfieStreamDiv = (
            <div className="Selfie-container">
            
                <div className="Selfie-container-header">
                    <div className="Selfie-container-header-brand">Grab a Date</div>
                    <AiFillCloseCircle onClick={()=>this._handleselfieClose()} className="Selfie-container-header-icon" />
                </div>
                {Boolean(this.state.imageDataURL)?Image:Player}

            </div>
        )
        const {  isloading } = this.props.auth;
        const Loading = (
            <div className="loader">Loadinggg.....</div>
        )
        return (<Fragment>
            {isloading?<div className="auth-loader">Grab a Date</div>:null}
            <div className="Login">
            
                {regInputs}
        
            </div>
            </Fragment>
        )
    }
}
const mapStateToProps = state =>({
    validatephone:state.OTPReducer,
    button:state.buttonReducer,
    auth:state.authReducer
})
export default connect(mapStateToProps, { selfieClicked })(Register);  
