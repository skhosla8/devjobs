// Base Imports
import React, { useContext } from 'react';
import { useLocation } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';

const Job = () => {
    const { theme } = useContext(ThemeContext);

    const location = useLocation();
    const job = location.state;

    return (
        <div className='job'>
            <div className='job__header'>
                <div className='job__header__logo' style={{ backgroundColor: job.logoBackground }}>
                    <img src={require(`../assets/logos/${job.logo}`)} alt='company-logo' />
                </div>

                <div className={`job__header__text card-${theme}`}>
                    <div>
                        {job.company}
                        <span>{job.company.toLowerCase()}.com</span>
                    </div>

                    <button className={`btn-${theme}`}>Company Site</button>
                </div>
            </div>

            <div className={`job__body card-${theme}`}>
                <div className='job__body__heading'>
                    <div>
                        <div className='job__body__heading__postedAt'>
                            {job.postedAt}
                            <span></span>
                            {job.contract}
                        </div>

                        <h1 className={`job__body__heading__position card-${theme}`}>{job.position}</h1>

                        <div className='job__body__heading__location'>{job.location}</div>
                    </div>

                    <button>Apply Now</button>
                </div>

                <div className='job__body__description'>
                    {job.description}
                </div>

                <div className='job__body__requirements'>
                    <h2 className={`card-${theme}`}>Requirements</h2>

                    <div className='job__body__requirements__content'>
                        {job.requirements.content}

                        <ul>
                            {job.requirements.items.map((item: string, i: number) => (
                                <li key={i}>{item}</li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className='job__body__role'>
                    <h2 className={`card-${theme}`}>What You Will Do</h2>

                    {job.role.content}

                    <ul>
                        {job.role.items.map((item: string, i: number) => (
                            <div className='job__body__role__item' key={i}>
                                <span>{i + 1}</span>
                                <li>{item}</li>
                            </div>
                        ))}
                    </ul>
                </div>
            </div>

            <div className={`job__footer card-${theme}`}>
                <div className={`job__footer__container card-${theme}`}>
                    <div>
                        {job.position}
                        <div>So Digital Inc.</div>
                    </div>

                    <button>Apply Now</button>
                </div>
            </div>
        </div>
    )
}

export default Job;