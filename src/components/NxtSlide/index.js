import {Component} from 'react'
import {v4} from 'uuid'
import SlideItem from '../SlideItem'
import './index.css'

// This is the list used in the application. You can move them to any component needed.
const initialSlidesList = [
  {
    id: 'cc6e1752-a063-11ec-b909-0242ac120002',
    heading: 'Welcome',
    description: 'Rahul',
  },
  {
    id: 'cc6e1aae-a063-11ec-b909-0242ac120002',
    heading: 'Agenda',
    description: 'Technologies in focus',
  },
  {
    id: 'cc6e1e78-a063-11ec-b909-0242ac120002',
    heading: 'Cyber Security',
    description: 'Ethical Hacking',
  },
  {
    id: 'cc6e1fc2-a063-11ec-b909-0242ac120002',
    heading: 'IoT',
    description: 'Wireless Technologies',
  },
  {
    id: 'cc6e20f8-a063-11ec-b909-0242ac120002',
    heading: 'AI-ML',
    description: 'Cutting-Edge Technology',
  },
  {
    id: 'cc6e2224-a063-11ec-b909-0242ac120002',
    heading: 'Blockchain',
    description: 'Emerging Technology',
  },
  {
    id: 'cc6e233c-a063-11ec-b909-0242ac120002',
    heading: 'XR Technologies',
    description: 'AR/VR Technologies',
  },
]

class NxtSlide extends Component {
  state = {
    slidesList: initialSlidesList,
    currentSlide: initialSlidesList[0],
    updatingSlide: initialSlidesList[0],
    isHeadingActive: false,
    isDescriptionActive: false,
  }

  onSlideItem = id => {
    const {slidesList} = this.state
    const activeSlide = slidesList.find(slide => slide.id === id)
    this.setState({currentSlide: activeSlide})
  }

  onBlurHeading = () => {
    const {currentSlide, slidesList} = this.state
    if (currentSlide.heading === '') {
      currentSlide.heading = 'Heading'
      const index = slidesList.findIndex(slide => slide.id === currentSlide.id)
      slidesList.splice(index, 1, currentSlide)
      this.setState({slidesList, isHeadingActive: false})
    } else {
      this.setState({isHeadingActive: false})
    }
  }

  onBlurDescription = () => {
    const {currentSlide, slidesList} = this.state
    if (currentSlide.description === '') {
      currentSlide.description = 'Description'
      const index = slidesList.findIndex(slide => slide.id === currentSlide.id)
      slidesList.splice(index, 1, currentSlide)
      this.setState({slidesList, isDescriptionActive: false})
    } else {
      this.setState({isDescriptionActive: false})
    }
  }

  onChangeHeading = event => {
    const {currentSlide, slidesList} = this.state
    currentSlide.heading = event.target.value
    const index = slidesList.findIndex(slide => slide.id === currentSlide.id)
    slidesList.splice(index, 1, currentSlide)
    this.setState({slidesList})
  }

  onChangeDescription = event => {
    const {currentSlide, slidesList} = this.state
    currentSlide.description = event.target.value
    const index = slidesList.findIndex(slide => slide.id === currentSlide.id)
    slidesList.splice(index, 1, currentSlide)
    this.setState({slidesList})
  }

  onClickHeading = () => {
    const {currentSlide} = this.state
    this.setState({
      isHeadingActive: true,
      isDescriptionActive: false,
      updatingSlide: currentSlide,
    })
  }

  onClickDescription = () => {
    const {currentSlide} = this.state
    this.setState({
      isDescriptionActive: true,
      isHeadingActive: false,
      updatingSlide: currentSlide,
    })
  }

  onClickNewBtn = () => {
    const {currentSlide, slidesList} = this.state
    const newSlide = {
      id: v4(),
      heading: 'Heading',
      description: 'Description',
    }
    const index = slidesList.findIndex(slide => slide.id === currentSlide.id)
    slidesList.splice(index + 1, 0, newSlide)
    this.setState({slidesList, currentSlide: slidesList[index + 1]})
  }

  render() {
    const {
      currentSlide,
      slidesList,
      isDescriptionActive,
      isHeadingActive,
      updatingSlide,
    } = this.state
    return (
      <div className="bg-container">
        <nav>
          <img
            className="logo"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-logo.png"
            alt="nxt slides logo"
          />
          <h1 className="logo-text">Nxt Slides</h1>
        </nav>
        <button
          testid="new"
          onClick={this.onClickNewBtn}
          className="new-btn"
          type="button"
        >
          <img
            className="plus-img"
            src="https://assets.ccbp.in/frontend/react-js/nxt-slides/nxt-slides-plus-icon.png"
            alt="new plus icon"
          />
          <p>New</p>
        </button>
        <div className="list-and-slide-container">
          <ol>
            {slidesList.map(slide => (
              <SlideItem
                isActive={currentSlide.id === slide.id}
                index={initialSlidesList.indexOf(slide)}
                slideDetails={slide}
                key={slide.id}
                onClickSlideItem={this.onSlideItem}
              />
            ))}
          </ol>
          <div testid="slide" className="slide-show-container">
            {isHeadingActive && currentSlide.id === updatingSlide.id ? (
              <input
                onBlur={this.onBlurHeading}
                onChange={this.onChangeHeading}
                className="heading-input"
                type="text"
                value={currentSlide.heading}
              />
            ) : (
              <h1 onClick={this.onClickHeading} className="slide-show-heading">
                {currentSlide.heading}
              </h1>
            )}
            {isDescriptionActive && currentSlide.id === updatingSlide.id ? (
              <input
                onBlur={this.onBlurDescription}
                onChange={this.onChangeDescription}
                type="text"
                className="description-input"
                value={currentSlide.description}
              />
            ) : (
              <p onClick={this.onClickDescription} className="slide-show-para">
                {currentSlide.description}
              </p>
            )}
          </div>
        </div>
      </div>
    )
  }
}
export default NxtSlide
