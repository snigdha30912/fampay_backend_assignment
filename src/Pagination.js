import React from "react";

const Pagination = ({videosPerPage, totalVideos, paginate}) =>{
    const pageNumbers = [];
    console.log(videosPerPage)
    console.log(totalVideos)
    for(let i=1; i<=Math.ceil(totalVideos.length/videosPerPage); i++)
    {
        pageNumbers.push(i);
    }

    return(
        <nav>
            <ul className="pagination" style={{padding:'30px'}}>
                {pageNumbers.map(number => (
                    <li key={number} className="page-item">
                        <a onClick={()=> paginate(number)} className="page-link">{number}</a>
                    </li>
                ))}
            </ul>
        </nav>
    );
}

export default Pagination;