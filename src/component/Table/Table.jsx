import numeral from 'numeral'
import React from 'react'
import "./table.scss"

const Table = ({countries }) => {
    return (
        <div className="table">
            {countries.map(({country, cases}) => (
                <tr>
                    {/* Emmet */}
                    <td>{country}</td>
                    <td>
                        <strong>{numeral(cases).format("0,0")}</strong>
                    </td>
                </tr>
            ))}
        </div>
    )
}

export default Table
