import React from 'react'
import PropTypes from 'prop-types'
import { FaUser, FaStar, FaCodeBranch, FaExclamationTriangle } from 'react-icons/fa'
import Card from './Card.jsx'
import Tooltip from './Tooltip.jsx'
export default function ReposGrid ({repos}){
    return (
      <ul className='grid space-around'>
        {
          repos.map((repo, index) => {
            const { name, owner, html_url, stargazers_count, forks, open_issues} = repo 
            const { login, avatar_url } = owner
            return <li key={html_url}>
              <Card 
              header={`#${index + 1}`}
              avatar={avatar_url}
              href={html_url}
              name={login}
              >
              <ul className='card-list'>
                <li>
                  <Tooltip text='Github username'>
                    <FaUser color='rgba(255, 191, 116)' size={22} />
                    <a href={`https://github.com/${login}`}>{login}</a>
                  </Tooltip>
                </li>
                <li>
                  <FaStar color='rgba(255, 215, 0)' size={22} />
                  {stargazers_count.toLocaleString()} stars
                </li>
                <li>
                  <FaCodeBranch color='rgba(129, 195, 245)' size={22} />
                  {forks.toLocaleString()} forks
                </li>
                <li>
                  <FaExclamationTriangle color='rgba(241, 138, 147)' size={22} />
                  {open_issues.toLocaleString()} issues
                </li>
              </ul>
              </Card>
            </li>
          })
        }
      </ul>
    )
  }


  ReposGrid.propTypes = {
    repos: PropTypes.array
  }