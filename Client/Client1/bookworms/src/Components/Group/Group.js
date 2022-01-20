import { useEffect } from 'react';
import { useState } from 'react/cjs/react.development'
import GroupCard from './GroupCard'
import './Styles/Group.css'
import M from 'materialize-css'

function Group() {

    const [groups, setGroups] = useState([]);

    const group1 = {
        group_id: '61526a9e-7328-11ec-90d6-0242ac120003',
        name: 'The Scotland Saints',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer.',
        owner: 'SallyJ23',
        library_id: '615269a4-7328-11ec-90d6-0242ac120003'
    }

    const group2 = {
        group_id: '61526f94-7328-11ec-90d6-0242ac120003',
        name: 'The Ginger Elephants',
        description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Mus mauris vitae ultricies leo integer.',
        owner: 'JohnnyTest',
        library_id: '61526bb6-7328-11ec-90d6-0242ac120003'
    }

    useEffect(() => {
        setGroups([group1, group2])
        M.AutoInit();
    }, [])



    return (
        <>
            <div className="page-label container">
                <h2 className="center-align">Your Groups</h2>
            </div>

            <div>
                <ul className='collapsible'>
                    {
                        groups.map((group, i) =>
                            <GroupCard group={group} key={i}></GroupCard>
                        )
                    }

                </ul>
            </div>

        </>
    )
}

export default Group;