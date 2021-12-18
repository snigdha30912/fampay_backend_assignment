import React, { useState } from "react";
import { useHistory } from 'react-router-dom';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

/*
Created sort component.
It creates 2 drop down menus for video title and publishing date 
to sort these in ascending and descending order.
*/
const SortComponent = () => {
    const history = useHistory();
    const [ordernameby, setOrderNameBy] = useState()
    const [orderdateby, setOrderDateBy] = useState()

    // sort by date. 
    const sort_date = (val) => {
        setOrderDateBy(val)
        if (val == 'descending') {
            history.push({
                pathname: '/order/',
                search: '?ordering=' + '-publishing_date',
            });
            window.location.reload();
        } else {
            history.push({
                pathname: '/order/',
                search: '?ordering=' + 'publishing_date',
            });
            window.location.reload();
        }
    }

    const sort_name = (val) => {
        setOrderNameBy(val)
        if (val == 'descending') {
            history.push({
                pathname: '/order/',
                search: '?ordering=' + '-video_title',
            });
            window.location.reload();
        } else {
            history.push({
                pathname: '/order/',
                search: '?ordering=' + 'video_title',
            });
            window.location.reload();
        }
    }

    return (
        <>
            <div style={{ justifyContent: 'center', display: 'inline-block', marginLeft: '90px', marginRight: '40px' }} >
                {/* drop down menu which creates 2 options - ascending and descending */}
                <Dropdown
                    color="accent"
                    label="Order By Title"
                    onClick={function (e) { console.log('clicked') }}
                    onSelect={function (val) { sort_name(val) }}
                >
                    <DropdownItem value="ascending">ascending</DropdownItem>
                    <DropdownItem value="descending">descending</DropdownItem>
                </Dropdown>

                <p style={{ display: 'inline-block', marginLeft: '20px', marginRight: '20px' }}>
                    {ordernameby}
                </p>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '50px', marginRight: '50px' }} >

                <Dropdown
                    color="accent"
                    label="Order By Date"
                    onClick={function (e) { console.log('clicked') }}
                    onSelect={function (val) { sort_date(val) }}
                >
                <DropdownItem value="ascending">ascending</DropdownItem>
                <DropdownItem value="descending">descending</DropdownItem>
                </Dropdown>
                <p style={{ display: 'inline-block', marginLeft: '20px', marginRight: '20px' }}>
                    {orderdateby}
                </p>
            </div>
        </>
    );
}

export default SortComponent;