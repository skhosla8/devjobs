// Base Imports
import React, { useState, useRef, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import data from '../data.json';
import { Job } from '../interfaces';
// Components 
import SearchBar from '../components/SearchBar';
import JobCard from '../components/JobCard';

const Home = () => {
    //eslint-disable-next-line
    const [searchParams, setSearchParams] = useSearchParams();

    const [loadAll, setLoadAll] = useState(false);
    const [jobs, setJobs] = useState<Job[]>([]);

    const fullTimeRef = useRef<HTMLDivElement | null>(null);

    const fullTimeContract = searchParams.get('contract');
    const filteredByLocation = searchParams.get('location');
    const filteredByName = searchParams.get('name');

    const displayedJobs = () => {
        let filteredJobs = [...jobs];

        if (fullTimeContract) {
            filteredJobs = filteredJobs.filter((job: Job) => job.contract === 'Full Time')
        }

        if (filteredByLocation) {
            filteredJobs = filteredJobs.filter((job: Job) => {
                return (
                    job.location.toLowerCase() === filteredByLocation.toLowerCase() ?
                        job.location.toLowerCase() === filteredByLocation.toLowerCase() :
                        filteredByLocation.length > 1 ?
                            job.location.toLowerCase().includes(filteredByLocation.toLowerCase()) :
                            filteredByLocation.length === 1 &&
                            job.location[0].toLowerCase() === filteredByLocation.toLowerCase()
                )
            });
        }

        if (filteredByName) {
            filteredJobs = filteredJobs.filter((job: Job) => {
                if (job.company.toLowerCase() === filteredByName.toLowerCase()) {
                    return job.company.toLowerCase() === filteredByName.toLowerCase();
                } else if (job.position.toLowerCase() === filteredByName.toLowerCase()) {
                    return job.position.toLowerCase() === filteredByName.toLowerCase();
                } else if (filteredByName.length > 1 && job.company.toLowerCase().includes(filteredByName.toLowerCase())) {
                    return job.company.toLowerCase().includes(filteredByName.toLowerCase());
                } else if (filteredByName.length > 1 && job.position.toLowerCase().includes(filteredByName.toLowerCase())) {
                    return job.position.toLowerCase().includes(filteredByName.toLowerCase());
                } else if (filteredByName.length === 1 && job.company[0].toLowerCase() === filteredByName.toLowerCase()) {
                    return job.company[0].toLowerCase() === filteredByName.toLowerCase();
                } else {
                    return job.position[0].toLowerCase() === filteredByName.toLowerCase();
                }
            });
        }

        return filteredJobs;
    }

    const renderedJobs = displayedJobs()?.map((job: Job, i: number) => (
        <JobCard key={i} job={job} />
    ));

    useEffect(() => {
        const selectedJobs = data.slice(0, 12);

        if (loadAll || filteredByName || filteredByLocation || fullTimeContract) {
            setJobs(data);
        } else {
            setJobs(selectedJobs);
        }
    }, [loadAll, filteredByName, filteredByLocation, fullTimeContract]);

    return (
        <div className='home'>
            <SearchBar
                ref={fullTimeRef}
                fullTimeContract={fullTimeContract}
            />

            <div className='home__jobs-container'>
                {renderedJobs}
            </div>

            {(!loadAll && !fullTimeContract && !filteredByLocation && !filteredByName) &&
                <button className='home__load-more' onClick={() => setLoadAll(true)}>Load More</button>
            }
        </div>
    )
}

export default Home;