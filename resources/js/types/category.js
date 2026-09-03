/**
 * @typedef {Object} CategoryOption
 * @property {string} id
 * @property {string|null} parent_id
 * @property {string} title
 */

/**
 * @typedef {Object} Category
 * @property {string} id
 * @property {string} title
 * @property {string} slug
 * @property {string|null} parent_id
 * @property {{id: string, title: string}|null} parent
 * @property {'active'|'deactive'} status
 * @property {boolean} is_featured
 * @property {string|null} thumbnail_url
 * @property {{id: number, name: string}|null} creator
 * @property {string} created_at
 */

export {};
