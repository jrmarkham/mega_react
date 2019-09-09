import React, {Component} from 'react'
import '../../styles/support-form.scss'

class SupportForm extends Component {
    constructor(props) {
        super(props);
        this.valid = false;
        this.errorReport = 'Submission Errors::';
        this.errorReport += '\nPlease include more details of your problem. ';
        this.errorReport += '\nPlease input a valid email. ';
        this.formName = `${props.code}Support`;
        this.supportTitle = `Support for ${props.name}`;
        this.state = {
            name: '',
            email: '',
            phone: '',
            deviceOS: 'iOS',
            deviceType: 'phone',
            device: '',
            problemType: 'functional',
            problem: '',
            render: 'form'
        };
        this.changeHandler = this.changeHandler.bind(this);
        this.submitHandler = this.submitHandler.bind(this);
    }

    resetHandler = (event) => {
        event.preventDefault();
        this.clearState();
    };

    clearState() {
        this.setState({
            name: '',
            email: '',
            phone: '',
            deviceOS: 'iOS',
            deviceType: 'phone',
            device: '',
            problemType: 'functional',
            problem: '',

        });
    }

    formBodyData() {
        let body = 'submit=submit';
        for (const key in this.state) {
            body += '&' + key.toString() + '=' + this.state[key].toString();
        }
        return body;
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.checkValid();
        if (!this.valid) {
            alert(this.errorReport);
            return;
        }
        const host = window.location.host;
        const post = host.includes('localhost') ? "http://localhost:8888/support" : "./data-php/support/";
        const bodyData = this.formBodyData();
        console.log('bodyData', bodyData);
        fetch(post, {
            method: 'POST', mode: 'no-cors', cache: 'no-cache', credentials: 'same-origin', headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/x-www-form-urlencoded',
            }, body: bodyData,

        }).catch(error => {
            console.error('error:: ', error);
            this.clearState();
            this.setState({
                render: 'error'
            });
        }).then((res) => {
          //  console.log('response:: ', res.status);
            this.clearState();
            this.setState({
                render: (200 === res.status) ? 'success' : 'error'
            });
        });
    };


    changeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({[nam]: val});
        this.checkValid();
    };

    checkValid() {
        this.errorReport = 'Submission Errors::';
        this.valid = true;
        let pattern = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;


        if (this.state.problem.length < 20) {
            this.valid = false;
            this.errorReport += '\nPlease include more details of your problem. ';

        }
        if (!pattern.test(this.state.email)) {
            this.errorReport += '\nPlease input a valid email. ';
            this.valid = false;
        }
        console.log('state', this.state);

    }

    displaySuccess() {
        return <p>Your support ticket has been sent. Please check your email for a reply in a few days.</p>
    }

    displayError() {
        return <p>Your support ticket didn't go through. Please try again or email us directly at <a
            href='mailto:support@markhamenterprises.com?Subject=Support%20Enterprises%20Inc%20Games%20'
            target='_top'>support@markhamenterprise.com</a> .</p>
    }

    setUpForm() {
        return <div className="form-container">
            <form name={this.formName} onSubmit={this.submitHandler} onReset={this.resetHandler}>
                <input type="hidden" name="app" value={this.props.name}/>
                <span className="form-header"> {this.supportTitle}</span> <br/>
                <div className="form-line">
                    <div className="form-label">(Optional) Name:</div>
                    <div className="form-element"><input type='text' name='name' value={this.state.name}
                                                         onChange={this.changeHandler}/>
                    </div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">
                    <div className="form-label">Email:</div>
                    <div className="form-element"><input required type='text' name='email' value={this.state.email}
                                                         onChange={this.changeHandler}/></div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">

                    <div className="form-label">(Optional) Phone:</div>
                    <div className="form-element"><input type='text' name='phone' value={this.state.phone}
                                                         onChange={this.changeHandler}/></div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">
                    <div className="form-label">OS:</div>
                    <div className="form-element"><select onChange={this.changeHandler} name='deviceOS'
                                                          value={this.state.deviceOS}>
                        <option value="iOS">iOS</option>
                        <option value="Android">Android</option>
                        <option value="Amazon">Amazon (Android)</option>
                    </select></div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">

                    <div className="form-label">Device Type:</div>
                    <div className="form-element"><select name='deviceType' onChange={this.changeHandler}
                                                          value={this.state.deviceType}>
                        <option value="phone">phone</option>
                        <option value="tablet">tablet</option>
                        <option value="other">other</option>
                    </select></div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">

                    <div className="form-label">(Optional) Device Details:</div>
                    <div className="form-element">
                        <textarea value={this.state.device} name='device' onChange={this.changeHandler}/></div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">

                    <div className="form-label">Problem Type:</div>
                    <div className="form-element"><select name='problemType' value={this.state.problemType}
                                                          onChange={this.changeHandler}>
                        <option value="functional">Game Play / App Feature</option>
                        <option value="billing">Billing</option>
                        <option value="other">Other</option>
                    </select></div>
                    <div className="form-clear"></div>
                </div>

                <div className="form-line">

                    <div className="form-label">Problem Description<br/>be as detailed as possible</div>
                    <div className="form-element">
                        <textarea required value={this.state.problem} name='problem' onChange={this.changeHandler}/>
                    </div>
                    <div className="form-clear"></div>
                </div>
                <div className="form-line">
                    <div className="form-label">
                        <button type="submit">Submit</button>
                    </div>
                    <div className="form-element">
                        <button type="reset">Reset</button>
                    </div>
                    <div className="form-clear"></div>
                </div>
            </form>
        </div>

    }

    render() {
        if ('success' === this.state.render) {
            return this.displaySuccess();
        } else if ('error' === this.state.render) {
            return this.displayError();
        } else {
            return this.setUpForm();
        }

    }

}

export default SupportForm;


/*

 $to = "support@markhamenterprises.com"; // this is your Email address
    $from = $_POST['email']; // this is the sender's Email address
    $game = $_POST['game'];
    $gn = $_POST['gameNode'];
    $name = $_POST['name'];
    $phone = $_POST['phone'];
    $os = $_POST['deviceOS'];
    $dt = $_POST['deviceType'];
    $device = $_POST['device'];
    $pt = $_POST['problemType'];
    $problem = $_POST['problem'];

    $reportMessage = "=============================================\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= " Support for ". $game . "\r\n";
    $reportMessage .= " Name: ". $name ."\r\n";
    $reportMessage .= " Email: ". $from . "\r\n";
    $reportMessage .= " Phone: ". $phone . "\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= " OS: ". $os ."\r\n";
    $reportMessage .= " Device Type: ". $dt . "\r\n";
    $reportMessage .= " Device: ". $device . "\r\n";
    $reportMessage .= "=============================================\r\n";
    $reportMessage .= " Problem Type: ". $pt  . "\r\n";
    $reportMessage .= " Problem :"  . wordwrap($problem, 70). "\r\n";
	$reportMessage .= "=============================================\r\n";
    $reportMessage .= "=============================================\r\n";


var email = document.forms[name].email.value;
       var problemLength = document.forms[name].problem.value.length;
       var pattern =/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
       var report = '';
       console.log("email" + email);
       console.log(" EXT LENGTH OF PROBLEM " + problemLength);
       var fail = false;
       if(problemLength < 20){
           report = 'Please include more details of your problem. ';
           fail = true;
       }

       if(!pattern.test(email)){
           report += 'Please input a valid email. ';
           fail = true;
       }

       if(fail){
           alert(report);
           return false;
       }
       return true;




 "<form name=\"bugleSupport\" method=\"post\"  onsubmit=\"return site.validateForm('bugleSupport');\" action=\"https://www.markhamenterprises.com/_php/sendEmail.php\" type=\"text/plain\">

 Name:<br><input type=\"text\" name=\"name\" required>

 <br>Email:<br><input type=\"hidden\" name=\"gameNode\" value=\"2\">

 <input type=\"hidden\" name=\"game\" value=\"The Bugle (the App)\">
 <input type=\"text\" name=\"email\" required><br>Phone (optional):
 <br><input type=\"text\" name=\"phone\" maxlength=\"10\"/><br>OS:<br>
 <select name=\"deviceOS\"><option value=\"iOS\" selected>iOS</option><option value=\"Android\" selected>Android</option></select><br>Device Type:<br><select name=\"deviceType\" required><option value=\"phone\" selected>Phone</option><option value=\"tablet\">Tablet</option><option value=\"other\">Other</option></select><br>Device Details:<br><input type=\"text\" name=\"device\" required><br>Problem (Please be as detailed as possible.):<br>

 <textarea type=\"text\" name=\"problem\" rows=\"5\" cols=\"50\" required></textarea>


 <br><br><input name=\"submit\" type=\"submit\" value=\"Send\"> <input type=\"reset\" value=\"Reset\"><form>"



 */
