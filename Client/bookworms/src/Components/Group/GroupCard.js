import { Link } from "react-router-dom";

import './Styles/GroupCard.css'


function GroupCard({ group }) {

    return (
        <>
            <li className='group-li'>
                <div className="collapsible-header group valign-wrapper row">
                    <i className='material-icons' id='group-icon'>group</i>
                    {group.name}

                    <Link id="group-button" className="btn col s3" to={`/group/${group.group_id}`}>Group page</Link>

                </div>
                <div className='collapsible-body'>
                    <span className='row'><h5>Description:</h5> {group.description}</span>
                    <span className='row'><h5>Owner:</h5> {group.owner}</span>
                    <div className="right-align">
                        <Link id="group-button" className="btn" to={`/group/${group.group_id}`}>Edit Group</Link>
                    </div>
                </div>
            </li>
        </>
    )
}

export default GroupCard;