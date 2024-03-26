import React from "react";
import './Footer.css'

export default function Footer() {
    
    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });
    };
    
    return (
    <>
    <footer>
        All Rights Reserved &copy; 2024 KanbanFlow.
        <p id="footer-logo" onClick={scrollToTop}>
            <code class="logo-symbol">&lt;/&gt;</code>
            </p>
            </footer>
            </>
            );
        }