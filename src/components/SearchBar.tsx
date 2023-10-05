// Base Imports
import React, { FC, useState, useEffect, ForwardedRef, forwardRef, useContext } from 'react';
import { useSearchParams } from 'react-router-dom';
import { ThemeContext } from '../context/ThemeContext';
// Icons/Images
import iconSearch from '../assets/icon-search.svg';
import iconLocation from '../assets/icon-location.svg';
import iconCheck from '../assets/icon-check.svg';
import { URLSearchParams } from 'url';

interface SearchBarProps {
    ref: ForwardedRef<HTMLDivElement | null>;
    fullTimeContract: string | null;
}

const SearchBar: FC<SearchBarProps> = forwardRef<HTMLDivElement, SearchBarProps>(
    ({ fullTimeContract }, ref) => {
        const { theme } = useContext(ThemeContext);

        const [searchParams, setSearchParams] = useSearchParams();

        const [value, setValue] = useState({
            name: searchParams.get('name') || '',
            location: searchParams.get('location') || ''
        });

        const [isFullTime, setIsFullTime] = useState(false);

        const handleChange = (e: { target: { name: string; value: string; }; }) => {
            setValue({
                ...value,
                [e.target.name]: e.target.value
            });
        };

        const handleContract = () => {
            setIsFullTime(!isFullTime);

            setSearchParams((prevParams: URLSearchParams) => {
                if (fullTimeContract) {
                    prevParams.delete('contract');
                } else {
                    prevParams.set('contract', 'full-time');
                }

                return prevParams;
            });

        };

        const handleSearch = () => {
            setSearchParams((prevParams: URLSearchParams) => {
                if (value.location) {
                    prevParams.set('location', value.location);
                } else {
                    prevParams.delete('location');
                }

                if (value.name) {
                    prevParams.set('name', value.name);
                } else {
                    prevParams.delete('name');
                }

                return prevParams;
            });
        };

        // toggle full time only checkbox
        useEffect(() => {
            if (ref !== null && typeof ref !== 'function') {
                if (isFullTime) {
                    ref.current!.style.backgroundColor = '#5964E0';

                } else {
                    // ref.current!.style.backgroundColor = '#e7e7e7';

                    if (theme === 'light') {
                        ref.current!.style.backgroundColor = '#e7e7e7';
                    } else {
                        ref.current!.style.backgroundColor = '#2c333c';
                    }
                }
            }

        }, [isFullTime, ref]);

        // persist full time checkbox to true if fullTimeContract search param exists 
        useEffect(() => {
            if (ref !== null && typeof ref !== 'function') {
                if (fullTimeContract) {
                    ref.current!.style.backgroundColor = '#5964E0';
                } else {
                    if (theme === 'light') {
                        ref.current!.style.backgroundColor = '#e7e7e7';
                    } else {
                        ref.current!.style.backgroundColor = '#2c333c';
                    }
                }
            }
        }, [fullTimeContract, ref]);

        useEffect(() => {
            if (ref !== null && typeof ref !== 'function') {
                if (theme === 'light') {
                    ref.current!.style.backgroundColor = '#e7e7e7';
                } else {
                    ref.current!.style.backgroundColor = '#2c333c';
                }
            }
        }, [theme]);

        return (
            <div className={`searchbar card-${theme}`}>
                <div className={`searchbar__criterion card-${theme}`}>
                    <img src={iconSearch} alt='icon-search' />
                    <input
                        type='text'
                        placeholder='Filter by title, companies, expertise...'
                        name='name'
                        value={value.name}
                        onChange={handleChange}
                    />
                </div>

                <div className={`searchbar__criterion border-${theme}`}>
                    <img src={iconLocation} alt='icon-location' />
                    <input
                        type='text'
                        placeholder='Filter by location...'
                        name='location'
                        value={value.location}
                        onChange={handleChange}
                    />
                </div>

                <div className='searchbar__criterion'>
                    <div className='searchbar__criterion__container'>
                        <div ref={ref} className={`searchbar__criterion__container__checkbox`} onClick={handleContract}>
                            {fullTimeContract &&
                                <img src={iconCheck} alt='icon-check' />
                            }
                        </div>

                        <span>Full Time Only</span>
                    </div>

                    <button className='searchbar__criterion__btn' onClick={handleSearch}>Search</button>
                </div>
            </div>
        )
    })

export default SearchBar;