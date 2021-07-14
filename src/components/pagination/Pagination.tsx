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
            result.push((<div key={i} className={`${selectedPage === i && 'active'}`} onClick={() => onPageNumberChanged(i)}>{i}</div>))
        }
        return result
    }

    return (
        <div className="pagination">
            <div onClick={() => onPageNumberChanged(selectedPage - 1)}>&laquo;</div>
            {
                getPagingNumber()
            }
            <div onClick={() => onPageNumberChanged(selectedPage + 1)}>&raquo;</div>
        </div>
    );
}
