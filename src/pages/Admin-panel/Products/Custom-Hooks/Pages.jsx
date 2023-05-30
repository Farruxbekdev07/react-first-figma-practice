import React from "react";
import usePagination from "./Custom-hooks";
import { Pagination } from "antd";
export const Pages = ({data}) => {
    const [ totalPages,
        startPageIndex,
        endPageIndex,
        currentPageIndex,
        displayPage, ] = usePagination(5, data.length)
    console.log(data);
    return (
        <>
            <div>
                <h1>User Posts</h1>
                {
                    (() => {
                        const displayPosts = []
                        for (let i = startPageIndex; i < endPageIndex; i++) {
                            displayPosts.push(
                                <div key={data[i].id}>
                                    <h3><span>{i+1}</span> {data[i].title} </h3>
                                    <p>{data[i].body}</p>
                                </div>
                            )                        
                        }
                        return displayPosts;
                    })()
                }
                <Pagination
                    // defaultCurrent={1}
                    total={100}
                    onChange={(event, value) => displayPage(value)}
                />
            </div>
        </>
    )
}