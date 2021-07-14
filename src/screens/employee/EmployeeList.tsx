import React, {useEffect, useState} from 'react';
import './EmployeeList.css'
import { Pagination } from "../../components";

interface Employee {
    id: string,
    phone: string,
    name: string
}

interface Filter {
    page: number,
    limit: number
}

export const EmployeeList: React.FC = () => {
    const [isLoading, setIsLoading] = useState<boolean>(false)
    const [isOpenAddNew, setIsOpenAddNew] = useState<boolean>(false)
    const [newName, setNewName] = useState<string>('')
    const [newPhone, setNewPhone] = useState<string>('')
    const [employeeList, setEmployeeList] = useState<Employee[]>([])
    const [filter, setFilter] = useState<Filter>({
        page: 1,
        limit: 5
    })

    const url = 'https://60ed7dc9a78dc700178adf53.mockapi.io/employees'
    const totalRows = 35 // should be get from server
    const {page, limit} = filter

    useEffect(() => {
        async function getEmployees() {
            try {
                setIsLoading(true)
                const data = await fetch(`${url}?page=${filter.page}&limit=${filter.limit}`)
                const dataJson: Employee[] = await data.json()
                setEmployeeList(dataJson)
            } catch (e) {
                console.log('Failed to fetch data', e.message)
            } finally {
                setIsLoading(false)
            }
        }

        getEmployees()
    }, [filter])

    const reset = (): void => {
        setIsOpenAddNew(false)
        setNewName('')
        setNewPhone('')
    }

    const handleOnPageNumberChanged = (pageNum: number) => {
        reset()
        setFilter({
            ...filter,
            page: pageNum
        })
    }

    const onNameChanged = (e: any) => {
        setNewName(e.target.value ?? newName)
    }

    const onPhoneChanged = (e: any) => {
        setNewPhone(e.target.value ?? newPhone)
    }

    const onCancel = () => reset()

    const onSubmit = async () => {
        try {
            setIsLoading(true)
            await fetch(url, {
                method: 'POST',
                mode: 'cors',
                cache: 'no-cache',
                credentials: 'same-origin',
                headers: {
                    'Content-Type': 'application/json'
                },
                redirect: 'follow',
                referrerPolicy: 'no-referrer',
                body: JSON.stringify({
                    phone: newPhone,
                    name: newName
                })
            });
            alert('Create new item successfully!!')
            reset()
        } catch (e) {
            console.log('Failed to post data', e.message)
        } finally {
            setIsLoading(false)
        }
    }

    return (
        <div className={`${isLoading ? 'container opacity-50' : 'container'}`}>
            <table>
                <thead>
                <tr>
                    <th>Name</th>
                    <th>Phone</th>
                </tr>
                </thead>
                <tbody>
                {
                    employeeList.map(e => (
                        <tr key={e.id}>
                            <td>{e.name}</td>
                            <td>{e.phone}</td>
                        </tr>
                    ))
                }

                {
                    isOpenAddNew &&
                    <tr key='100000'>
                        <td><input type="text" value={newName} onChange={e => onNameChanged(e)}/></td>
                        <td><input type="text" value={newPhone} onChange={e => onPhoneChanged(e)}/></td>
                    </tr>
                }
                </tbody>
            </table>
            {
                isOpenAddNew ?
                    <div>
                        <button onClick={onCancel}>Cancel</button>
                        <button onClick={onSubmit} className="ml-1">Submit</button>
                    </div>
                    : <button onClick={() => setIsOpenAddNew(true)} className="mt-1">+ New</button>
            }
            <Pagination
                selectedPage={page}
                limit={limit}
                totalRows={totalRows}
                onPageChanged={pageNumber => handleOnPageNumberChanged(pageNumber)} />
        </div>
    );
}
