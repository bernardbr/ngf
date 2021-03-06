const util = require('util')

module.exports = class NGF {
    constructor(childProcess, cmd, options) {
      this._childProcess = childProcess
      this._cmd = cmd
      this._options = options
      this._spawnOptions = {
        stdio: 'inherit'
      }

      this._normalizeOptions()
    }

    run() {
      let _action = this._options._[0]

      if (!_action) {
          this._createDefault()
          return
      }

      switch(_action) {
        case "g":
        case "gen":
        case "generate":
          this._createSubGenerator()
          break
      }
    }

    _normalizeOptions() {
      if (!util.isArray(this._options._)) {
        this._options._ = ["", "", ""]
        this._options.feature = ""
      }
    }

    _callYoNgFullstack(params) {
      this._childProcess.spawn(this._cmd, params, this._spawnOptions)
    }

    _createDefault() {
      this._callYoNgFullstack(['ng-fullstack'])
    }

    _createSubGenerator() {
      let _type = this._options._[1]
      let _name = this._options._[2]
      let _feat = this._options.ft ||
                  this._options.feat ||
                  this._options.feature

      if (!_name) {
        throw new TypeError('The name has to be defined.')
      }

      if (!_feat) {
        throw new TypeError('The feature has to be defined.')
      }

      switch(_type) {
        case "cmp":
        case "component":
          this._callYoNgFullstack(['ng-fullstack:component', _name, '--feature', _feat])
          break

        case "dct":
        case "directive":
          this._callYoNgFullstack(['ng-fullstack:directive', _name, '--feature', _feat])
          break

        case "ctrl":
        case "controller":
          this._callYoNgFullstack(['ng-fullstack:controller', _name, '--feature', _feat])
          break

        case "mde":
        case "model":
          this._callYoNgFullstack(['ng-fullstack:model', _name, '--feature', _feat])
          break

        case "svc":
        case "service":
          this._callYoNgFullstack(['ng-fullstack:service', _name, '--feature', _feat])
          break

        case "fct":
        case "factory":
          this._callYoNgFullstack(['ng-fullstack:factory', _name, '--feature', _feat])
          break

        case "mdu":
        case "module":
          this._callYoNgFullstack(['ng-fullstack:module', _name, '--feature', _feat])
          break

        case "flt":
        case "filter":
          this._callYoNgFullstack(['ng-fullstack:filter', _name, '--feature', _feat])
          break

        case "rsc":
        case "resource":
          this._callYoNgFullstack(['ng-fullstack:resource', _name, '--feature', _feat])
          break


        case "dec":
        case "decorator":
          this._callYoNgFullstack(['ng-fullstack:decorator', _name, '--feature', _feat])
          break

        case "pp":
        case "pipe":
          this._callYoNgFullstack(['ng-fullstack:pipe', _name, '--feature', _feat])
          break

        case "stl":
        case "style":
          this._callYoNgFullstack(['ng-fullstack:style', _name, '--feature', _feat])
          break

        case "vw":
        case "view":
          this._callYoNgFullstack(['ng-fullstack:view', _name, '--feature', _feat])
          break

        case "edpt":
        case "endpoint":
          this._callYoNgFullstack(['ng-fullstack:endpoint', _name, '--feature', _feat])
          break

        default:
          throw new Error('Type not recognized.')
      }
    }
}
