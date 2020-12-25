import React, { Component } from 'react'

export class Footer extends Component {
    render() {
        return (
            <div className="Footer">
                <div className="Footer-row1">

                </div>
                <div className="Footer-row2">
                    <div className="Footer-row2-col1">
                        India
                        <p>Website created by Anandhu Satheesh.</p>
                        </div>
                    <div className="Footer-row2-col2">
                        <ul className="Footer-row2-col2-ul">
                            <li><a href="">About</a></li>
                            <li><a href="">Contact us</a></li>
                            <li><a href="">Careers</a></li>
                        </ul>
                    </div>
                </div>
            </div>
        )
    }
}

export default Footer
