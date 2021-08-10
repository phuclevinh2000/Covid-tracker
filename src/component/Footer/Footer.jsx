import React from 'react'
import "./footer.scss"
//Material UI Icons
import GitHubIcon from '@material-ui/icons/GitHub';
import InstagramIcon from '@material-ui/icons/Instagram';
import EmailIcon from '@material-ui/icons/Email';

const Footer = () => {
    return (
        <div className="container">
            <div className="foot">Create by Phuclevinh - 2021</div>
            <div className="icon">
                <a className="website" rel="noreferrer" href={`mailto:phuclevinh2000@gmail.com`} target="_blank">
                    <EmailIcon style={{ fontSize: 35, color: 'grey'}}/>
                </a>
                <a className="website" rel="noreferrer" href={`https://www.instagram.com/vinhphucle/`} target="_blank">
                    <InstagramIcon style={{ fontSize: 35, color: 'grey'}}/>
                </a>
                <a className="website" rel="noreferrer" href={`https://github.com/phuclevinh2000`} target="_blank">
                    <GitHubIcon style={{ fontSize: 35, color: 'grey'}}/>
                </a>
            </div>
        </div>
    )
}

export default Footer