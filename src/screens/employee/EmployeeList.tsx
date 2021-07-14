import React, {useEffect, useState} from 'react';
import './EmployeeList.css'

interface Employee {
    id: string,
    phone: string,
    name: string
}

interface Filter {
    page: number,
    limit: number
}

const EmployeeList: React.FC = () => {
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

    const handleOnPrev = () => {
        reset()
        if (page === 1) {
            // Disabled
            return
        }
        setFilter({
            ...filter,
            page: page - 1
        })
    }

    const handleOnNext = () => {
        reset()
        if (page * limit >= 100) {
            // Disabled
            return
        }
        setFilter({
            ...filter,
            page: page + 1
        })
    }

    const onNameChanged = (e: any) => {
        setNewName(e.target.value ?? '')
    }

    const onPhoneChanged = (e: any) => {
        setNewPhone(e.target.value ?? '')
    }

    const onCancel = () => reset()

    const onSubmit = async () => {
        try {
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
                    phone: newName,
                    name: newPhone
                })
            });
            alert('Create new item successfully!!')
            reset()
        } catch (e) {
            console.log('Failed to post data', e.message)
        }
    }

    return (
        <React.Fragment>
            {
                isLoading ? <span>Loading...</span> :
                    <div className="container">
                        {JSON.stringify(filter)}
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
                        <div className="flex-btn">
                            <button onClick={handleOnPrev}>Prev</button>
                            <button onClick={handleOnNext} className="ml-1">Next</button>
                        </div>
                    </div>
            }
        </React.Fragment>
    );
}

export default EmployeeList;
