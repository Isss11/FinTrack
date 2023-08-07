function CategoryEntry(props) {
    return (
        <tr>
            <td>{props.category}</td>
            <td>{props.amount}</td>
        </tr>
    )
}

export default CategoryEntry