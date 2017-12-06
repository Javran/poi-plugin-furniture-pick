import _ from 'lodash'
import { join } from 'path-extra'
import React, { PureComponent } from 'react'
import { connect } from 'react-redux'
import { Label, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { MaterialIcon } from 'views/components/etc/icon'

import { itemsSelector } from '../selectors'
import { initState } from '../store'
import { PTyp } from '../ptyp'

class ItemsViewImpl extends PureComponent {
  static propTypes = {
    style: PTyp.object.isRequired,
    /* eslint-disable react/require-default-props */
    // just a awkward way to say that "null" or number are both allowed
    fCoin: PTyp.number,
    fBoxSmall: PTyp.number,
    fBoxMedium: PTyp.number,
    fBoxLarge: PTyp.number,
    fFairy: PTyp.number,
    /* eslint-enable react/require-default-props */
  }

  static defaultProps = initState.items

  render() {
    const {
      style,
      fCoin,
      fBoxSmall, fBoxMedium, fBoxLarge, fFairy,
    } = this.props
    const ppr = raw => _.isInteger(raw) ? raw : '?'

    const norm = raw => _.isInteger(raw) ? raw : 0
    const extraFCoin =
      200*norm(fBoxSmall) + 400*norm(fBoxMedium) + 700*norm(fBoxLarge)


    const resultText = (() => {
      const es = _.flatMap(
        [[fBoxSmall, 200], [fBoxMedium, 400], [fBoxLarge, 700]],
        ([num, fc]) => _.isInteger(num) ? [`${fc}x${num}`] : []
      )
      return `${extraFCoin} = ${es.join(' + ')}`
    })()

    return (
      <div
        className="items-view"
        style={style}
      >
        <div>
          <img
            className="item-icon"
            alt="f-coin" src={join(__dirname, '..', 'assets', 'coin.png')}
          />
          <span
            className={fCoin === 200000 ? 'poi-ship-cond-53 dark' : ''}
            style={{marginLeft: '.4em'}}
          >
            {ppr(fCoin)}
          </span>

          <OverlayTrigger
            placement="right"
            overlay={(
              <Tooltip
                className="furniture-pick-pop"
                id="furniture-pick-compute-box-coin-worth"
              >
                {resultText}
              </Tooltip>
            )}
          >
            <Label style={{marginLeft: '1em', fontSize: '1em'}}>+{extraFCoin}</Label>
          </OverlayTrigger>
        </div>
        <div
          style={{
            display: 'flex',
            marginTop: 10,
          }}
        >
          <div style={{marginRight: '1em', minWidth: '15%'}}>
            <MaterialIcon materialId={10} className="item-icon" />
            <span style={{marginLeft: '.2em'}}>x{ppr(fBoxSmall)}</span>
          </div>
          <div style={{marginRight: '1em', minWidth: '15%'}}>
            <MaterialIcon materialId={11} className="item-icon" />
            <span style={{marginLeft: '.2em'}}>x{ppr(fBoxMedium)}</span>
          </div>
          <div style={{marginRight: '1em', minWidth: '15%'}}>
            <MaterialIcon materialId={12} className="item-icon" />
            <span style={{marginLeft: '.2em'}}>x{ppr(fBoxLarge)}</span>
          </div>
          <div style={{marginRight: '1em', minWidth: '15%'}}>
            <img
              className="item-icon"
              alt="f-fairy" src={join(__dirname, '..', 'assets', 'fairy.png')}
            />
            <span style={{marginLeft: '.2em'}}>x{ppr(fFairy)}</span>
          </div>
        </div>
      </div>
    )
  }
}

const ItemsView = connect(itemsSelector)(ItemsViewImpl)

export { ItemsView }
