import React from 'react';
import './Pagination.css'

interface Props {
    selectedPage: number
    limit: number
    totalRows: number
    onPageChanged: (page: number) => void
}

export const Pagination: React.FC<Props> = (props) => {
    const { selectedPage, limit, totalRows, onPageChanged } = props
    const totalPageNumbers = Math.ceil(totalRows / limit)

    const onPageNumberChanged = (pageNum: number): void => {
        if ((pageNum - 1) * limit >= totalRows || pageNum < 1) {
            return
        }
        onPageChanged(pageNum)
    }

    const getPagingNumber = (): JSX.Element[] => {
        const result: JSX.Element[] = []
        for (let i = 1; i <= totalPageNumbers; i++) {
            result.push((<a key={i} href="#" className={`${selectedPage === i && 'active'}`} onClick={() => onPageNumberChanged(i)}>{i}</a>))
        }
        return result
    }

    return (
        <div className="pagination">
            <a href="#" onClick={() => onPageNumberChanged(selectedPage - 1)}>&laquo;</a>
            {
                getPagingNumber()
            }
            <a href="#" onClick={() => onPageNumberChanged(selectedPage + 1)}>&raquo;</a>
        </div>
    );
}
