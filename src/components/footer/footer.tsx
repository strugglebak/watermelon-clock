import React, { Component } from 'react'
import './footer.styl'

export class footer extends Component {
  render() {
    return (
      <div className="page-footer">
        <p className="copyright">
          <span>©</span>
          <span>2020 strugglebak</span>
        </p>
        <ul className="page-footer-right">
          <li>
            <a href="https://github.com/strugglebak">开发者</a>
          </li>
          <li>
            <a href="https://github.com/strugglebak/watermelon-clock">仓库地址</a>
          </li>
        </ul>
      </div>
    )
  }
}

export default footer
