import '../index.css';

function CategoryEntry(props) {
    return (
        <div>
            {props.category} {props.amount}
        </div>
    )
}

export default CategoryEntry