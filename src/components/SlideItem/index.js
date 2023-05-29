import './index.css'

const SlideItem = props => {
  const {slideDetails, index, isActive, onClickSlideItem} = props
  const {id, heading, description} = slideDetails
  const className = isActive ? 'active-li' : ''
  const onClickSlide = () => {
    onClickSlideItem(id)
  }
  return (
    <li testid={`slideTab${index + 1}`} className={className}>
      <button onClick={onClickSlide} className="slide-item-btn" type="button">
        <p className="slide-length">{index + 1}</p>
        <div className="list-slide-container">
          <h1 className="list-slide-head">{heading}</h1>
          <p className="list-slide-para">{description}</p>
        </div>
      </button>
    </li>
  )
}
export default SlideItem
