import React, { useState, useEffect, useCallback } from 'react'
import FireStoreParser from 'firestore-parser'
import { arrayToShuffled } from 'array-shuffle'
import queryString from 'query-string'

import presets, { ConfigOptions, PresetName } from './presets'
import { roomsApiUrlPattern, defaultConfig } from './config'
import { getRandomTurn } from './utils'
import Game from './Game'
import { compare, FractionValue, parseFraction } from './fractions'

function getRoomConfig(roomId: string): Promise<ConfigOptions> {
  return fetch(roomsApiUrlPattern.replace('{roomId}', roomId))
    .then((res) => res.json())
    .then(
      (json) =>
        FireStoreParser<{ fields: { config: ConfigOptions } }>(json).fields
          .config,
    )
    .then((roomConfig) => {
      console.log(
        `Fetched remote configuration for room "${roomId}"`,
        roomConfig,
      )
      return roomConfig
    })
}

export interface QueryStringParams {
  preset?: PresetName
  targetValue?: unknown
  availableCards?: unknown
  playerCardsAmount?: unknown
  tableCardsAmount?: unknown
  cardType?: unknown
  pauseOnAiPlay?: unknown
  hintsDelay?: unknown
}

export function getLocalConfig(params: QueryStringParams): ConfigOptions {
  const baseConfig =
    typeof params.preset === 'string' && presets[params.preset]
      ? presets[params.preset].options
      : defaultConfig

  const playerCardsAmount =
    typeof params.playerCardsAmount === 'number' && params.playerCardsAmount > 0
      ? params.playerCardsAmount
      : baseConfig.playerCardsAmount

  const tableCardsAmount =
    typeof params.tableCardsAmount === 'number' && params.tableCardsAmount >= 0
      ? params.tableCardsAmount
      : baseConfig.tableCardsAmount

  const parsedTargetValue = parseFraction(params.targetValue)
  const targetValue = parsedTargetValue || baseConfig.targetValue

  const availableCards = Array.isArray(params.availableCards)
    ? params.availableCards
        .map(parseFraction)
        .filter(
          (value): value is FractionValue =>
            value !== null && compare(value, targetValue) < 0,
        )
    : baseConfig.availableCards

  const isValidStack =
    availableCards.length >= tableCardsAmount + 2 * playerCardsAmount

  return {
    targetValue,
    playerCardsAmount: isValidStack
      ? playerCardsAmount
      : baseConfig.playerCardsAmount,
    tableCardsAmount: isValidStack
      ? tableCardsAmount
      : baseConfig.tableCardsAmount,
    availableCards: isValidStack ? availableCards : baseConfig.availableCards,
    cardType:
      typeof params.cardType === 'string' &&
      (params.cardType === 'image' || params.cardType === 'number')
        ? params.cardType
        : baseConfig.cardType,
    pauseOnAiPlay:
      typeof params.pauseOnAiPlay === 'boolean'
        ? params.pauseOnAiPlay
        : baseConfig.pauseOnAiPlay,
    hintsDelay:
      typeof params.hintsDelay === 'number'
        ? Math.max(0, params.hintsDelay)
        : baseConfig.hintsDelay,
  }
}

const parsedQs = queryString.parse(window.location.search, {
  parseBooleans: true,
  parseNumbers: true,
  arrayFormat: 'comma',
})

const isValidRoomId = typeof parsedQs.r === 'string'

// If valid roomId querystring param, we wait for remote config
const initialState = isValidRoomId ? null : getLocalConfig(parsedQs)

const ConfigProvider: React.FC = () => {
  const [initialConfig, setInitialConfig] = useState(initialState)

  useEffect(() => {
    if (!isValidRoomId) return
    getRoomConfig(parsedQs.r as string)
      .then(setInitialConfig)
      .catch((e) => {
        console.warn(
          `Error fetching remote configuration for room "${parsedQs.r}":`,
          e.message,
        )
        setInitialConfig(getLocalConfig(parsedQs))
      })
  }, [])

  const handleShuffle = useCallback(
    (arr: ConfigOptions['availableCards']) =>
      import.meta.env.DEV && parsedQs.noShuffle ? arr : arrayToShuffled(arr),
    [],
  )

  const initialIsPlayerTurn =
    import.meta.env.DEV && typeof parsedQs.isPlayerTurn !== 'undefined'
      ? Boolean(parsedQs.isPlayerTurn)
      : getRandomTurn()

  return initialConfig ? (
    <Game
      initialIsPlayerTurn={initialIsPlayerTurn}
      initialConfig={initialConfig}
      showRules={window.localStorage.getItem('showRules') !== 'false'}
      shuffle={handleShuffle}
    />
  ) : (
    <span>Cargando la configuración de la sala...</span>
  )
}

export default ConfigProvider
