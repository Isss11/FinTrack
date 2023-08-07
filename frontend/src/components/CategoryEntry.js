function CategoryEntry(props) {
    return (
        <tr>
            <td>{props.category}</td>
            <td>{(Math.round(parseFloat(props.amount) * 100) / 100).toFixed(2)}</td>
        </tr>
    )
}

export default CategoryEntry