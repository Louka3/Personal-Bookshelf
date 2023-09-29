import React, {useState} from "react";
import { Link } from 'react-router-dom';
import githubLogo from '../assets/github-logo.svg'

const Footer = () => {
    return (
        <footer className="app-footer">
            <div className="footer-bar">
                <ul className="footer-lists footer-list-left">
                    <li><a className="github-link" href="https://github.com/Louka3"><img src={githubLogo} />  Louka3  </a> </li>
                </ul>
                <p className="footer-middle">Designed By: Louis Kuczykowski</p>
                <ul className="footer-lists footer-list-right">
                    <li></li>
                </ul>
            </div>
        </footer>
    )
}

export default Footer;
