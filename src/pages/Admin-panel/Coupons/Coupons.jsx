import React from "react";
import { Dashboard } from "../Dashboard/Dashboard";
import '../../../css/TS/Coupons/coupons.css';
import coupons1 from '../../../media/images/coupons 1.png';
import coupons2 from '../../../media/images/coupons 2.png';

function Coupons() {
    const coupons = [
        {
            name: 'All new snakers',
            discount: '32',
            date: '01-10 December',
            image: coupons1,
            bg: 'aqua'
        },
        {
            name: 'All new snakers',
            discount: '50',
            date: '01-10 December',
            image: coupons2,
            bg: 'yellow'
        },
    ]

    return (
        <>
            <Dashboard />
            <main className="dashboard-main">
                <div className="coupons-title"></div>
                <div className="coupons-wrapper">
                    <div className="coupons-card-wrapper">
                        {
                            coupons.map((item, id) => {
                                return (
                                    <div className="coupons-card" key={id} id={item.bg}>
                                        <div className="content-wrapper">
                                            <div className="date">
                                                <p>{item.date}</p>
                                            </div>
                                            <div className="name">
                                                <h2>{item.discount}%</h2>
                                                <p>{item.name}</p>
                                            </div>
                                        </div>
                                        <div className="image-wrapper">
                                            <img src={item.image} alt="coupons" />
                                        </div>
                                    </div>
                                );
                            })
                        }
                    </div>
                </div>
            </main>
        </>
    );
};
export { Coupons };