import React,{useState} from "react";
import { useHistory } from 'react-router-dom';
import Dropdown from 'muicss/lib/react/dropdown';
import DropdownItem from 'muicss/lib/react/dropdown-item';

const SortComponent = () => {
    const history = useHistory();
    const [ordernameby,setOrderNameBy] = useState()
    const [orderdateby,setOrderDateBy] = useState()
   

    const sort_date = (val) => {
        setOrderDateBy(val)
        if(val=='descending'){
            history.push({
                pathname: '/order/',
                search: '?ordering=' + '-publishing_date',
            });
            window.location.reload();
        }else{
            history.push({
                pathname: '/order/',
                search: '?ordering=' + 'publishing_date',
            });
            window.location.reload();
        }
        

    }

    

    const sort_name = (val) => {
        setOrderNameBy(val)
        if(val=='descending'){
            history.push({
                pathname: '/order/',
                search: '?ordering=' + '-video_title',
            });
            window.location.reload();
        }else{
            history.push({
                pathname: '/order/',
                search: '?ordering=' + 'video_title',
            });
            window.location.reload();
        }
        

    }


    return (
        // <nav>
        //     <ul className="pagination">
        //             <li  className="page-item">
        //                 <button onClick={sort_date_asc} className="page-link">sort by date - ascending</button>
        //             </li>
        //             <li  className="page-item">
        //                 <button onClick={sort_date_dec} className="page-link">sort by date - descending</button>
        //             </li>
        //             <li  className="page-item">
        //                 <button onClick={sort_name_asc} className="page-link">sort by name - ascending</button>
        //             </li>
        //             <li  className="page-item">
        //                 <button onClick={sort_name_dec} className="page-link">sort by name - descending</button>
        //             </li>
        //     </ul>
        // </nav>
        <>
            <div style={{ justifyContent:'center', display: 'inline-block', marginLeft: '90px',marginRight:'40px'}} >

                <Dropdown
                    color="accent"
                    label="Order By Name"
                    onClick={function (e) {console.log('clicked') }}
                    onSelect={function (val) { sort_name(val) }}
                >

                    <DropdownItem value="ascending">ascending</DropdownItem>
                    <DropdownItem value="descending">descending</DropdownItem>



                </Dropdown>
                <p style={{ display: 'inline-block', marginLeft: '20px',marginRight:'20px' }}>
                    {ordernameby}
                </p>
            </div>
            <div style={{ display: 'inline-block', marginLeft: '50px',marginRight:'50px' }} >

                <Dropdown
                    color="accent"
                    label="Order By Date"
                    onClick={function (e) {console.log('clicked') }}
                    onSelect={function (val) { sort_date(val) }}
                >

                    <DropdownItem value="ascending">ascending</DropdownItem>
                    <DropdownItem value="descending">descending</DropdownItem>



                </Dropdown>
                <p style={{ display: 'inline-block', marginLeft: '20px',marginRight:'20px' }}>
                    {orderdateby}
                </p>
            </div>
        </>
    );
}

export default SortComponent;