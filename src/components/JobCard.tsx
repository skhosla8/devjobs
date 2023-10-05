// Base Imports 
import React, { FC, useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { NavLink } from 'react-router-dom';
import { Job } from '../interfaces';

interface JobCardProps {
    job: Job;
};

const JobCard: FC<JobCardProps> = ({ job }) => {
    const { theme } = useContext(ThemeContext);

    return (
        <NavLink to='job' state={job}>
            <div className={`jobcard card-${theme}`}>
                <div className='jobcard__logo-container' style={{ backgroundColor: job.logoBackground }}>
                    <img src={require(`../assets/logos/${job.logo}`)} alt='company-logo' />
                </div>

                <div className='jobcard__details'>
                    {job.postedAt}

                    <span></span>

                    {job.contract}
                </div>

                <div className='jobcard__position'>{job.position}</div>

                <div className='jobcard__details'>{job.company}</div>

                <div className='jobcard__location'>{job.location}</div>
            </div>
        </NavLink>
    )
}

export default JobCard;