import React, {useState} from 'react';
import styles from './Pagination.module.css'
import cn from 'classnames'
import {LeftSquareTwoTone, RightSquareTwoTone} from '@ant-design/icons';

type PropsType = {
    totalItemsCount: number
    pageSize: number
    currentPage: number
    onPageChanged: (pageNumber: number) => void
    portionSize: number
}

export const Pagination: React.FC<PropsType> = ({totalItemsCount, pageSize, currentPage, onPageChanged, portionSize = 10}) => {
    let pagesCount = Math.ceil(totalItemsCount / pageSize);

    let pages: number[] = [];
    for (let i = 1; i <= pagesCount; i++) {
        pages.push(i)
    }

    let portionCount = Math.ceil(pagesCount / portionSize);
    let [portionNumber, setPortionNumber] = useState(1);
    let leftPortionPageNumber = (portionNumber - 1) * portionSize + 1;
    let rightPortionPageNumber = portionNumber * portionSize;

    return (
        <div className={cn(styles.paginator)}>
            {portionNumber > 1 &&
                <LeftSquareTwoTone className={styles.button} onClick={() => {
                    setPortionNumber(portionNumber - 1)
                }}>PREV</LeftSquareTwoTone>}

            <div className={styles.paginatorNumbers}>
                {pages
                    .filter(p => p >= leftPortionPageNumber && p <= rightPortionPageNumber)
                    .map(p => {
                        return <span
                            key={p}
                            className={cn({[styles.selectedPage]: currentPage === p}, styles.pageNumber)}
                            onClick={() => {
                                onPageChanged(p)
                            }}>{p}</span>
                    })}
            </div>
            {portionCount > portionNumber &&
                <RightSquareTwoTone className={styles.button}
                                    onClick={() => setPortionNumber(portionNumber + 1)}>NEXT</RightSquareTwoTone>}
        </div>
    );
};

