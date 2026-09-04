'use strict'

const HEADER = {
  API_KEY: 'x-api-key',
  AUTHORIZATION: 'authorization',
}

const { findById } = require('../services/apikey.service');
const router = require("../routes");

const apiKey = async (req, res, next) => {
  try {
    const key = req.headers[HEADER.API_KEY]?.toString()
    if (!key) {
      return res.status(403).json({
        message: 'Forbidden x-api-key',
      })
    }

    // check objKey
    const objKey = await findById(key)
    if (!objKey) {
      return res.status(403).json({
        message: 'Forbidden not found',
      })
    }

    req.objKey = objKey
    return next()
  } catch (error) {

  }
}

const permission = (permission) => {
  return (req, res, next) => {
    if (!req.objKey.permissions) {
      return res.status(403).json({
        message: 'permissions denined',
      })
    }

    console.log('permission::', req.objKey.permissions)
    const validPermission = req.objKey.permissions.includes(permission)

    if (!validPermission) {
      return res.status(403).json({
        message: 'permissions denined',
      })
    }

    return next()
  }
}

module.exports = { apiKey, permission };