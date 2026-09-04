'use strict';

const shopModel = require('../models/shop.model');
const bycrypt = require('bcrypt');
const crypto = require('crypto');
const KeyTokenService = require('./keyToken.service');
const { createTokenPair } = require("../auth/authUtils");
const { getIntoData } = require("../utils");

const RoleShop = {
  SHOP: 'SHOP',
  WRITER: 'WRITER',
  EDITOR: 'EDITOR',
  ADMIN: 'ADMIN',
}

class AccessService {
  static signUp = async ({ name, email, password }) => {
    try {
      // step1: check email exist?
      const holderShop = await shopModel.findOne({ email }).lean() // lean -> return object js
      if (holderShop) {
        return {
          code: 'xxxx',
          message: 'Shop already exists!'
        }
      }

      const passwordHash = await bycrypt.hash(password, 10);
      const newShop = await shopModel.create({ name, email, password: passwordHash, roles: [ RoleShop.SHOP ] });

      if (newShop) {
        // created privateKey, publicKey
        const { privateKey, publicKey } = crypto.generateKeyPairSync('rsa', {
          modulusLength: 4096,
          privateKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          },
          publicKeyEncoding: {
            type: 'pkcs1',
            format: 'pem',
          }
        })

        console.log({ privateKey, publicKey })

        const publicKeyString = await KeyTokenService.createKeyToken({
          userId: newShop._id,
          publicKey
        })

        if (!publicKeyString) {
          return {
            code: 'xxxx',
            message: 'publicKeyString error'
          }
        }

        const publicKeyObject = crypto.createPublicKey(publicKeyString)

        const tokens = await createTokenPair({ userId: newShop._id, email }, publicKeyObject, privateKey)
        console.log(`Created Token Success::`, tokens);

        return {
          code: 201,
          metadata: {
            shop: getIntoData({ fields: ['_id', 'name', 'email'], object: newShop }),
            tokens
          }
        }
      }

      return {
        code: 200,
        metadata: null
      }
    } catch (e) {
      return {
        code: 'xxx',
        message: e.message,
        status: 'error',
      }
    }
  }
}

module.exports = AccessService;