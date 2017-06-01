import store from '../vuex/store.js'

const defaultTimeOut = 4000
const isTokenValid = () => {
    if (store.getters.isTokenValid) {
        store.dispatch(action_types.INVALIDATE_TOKEN)
            .then(() => {
                //TODO CONTINUE HERE
                event.emit(event.POPUP_ERROR, [ this.translate('all.error'), this.translate('all.error.logout') ]);
            })
            .catch((err) => {
                console.error('Ajax.isTokenValid error : '+err)
            })
    }
}

export default {
    post (url, params) {
        return new Promise((resolve, reject) => {
            try {
                if (!isTokenValid()) {

                    reject({ success : false, status : -1, message : 'token invalid' })
                    return
                }

                var encodedParams
                if (params) {
                    for (var key in params) {
                        if (params.hasOwnProperty(key)) {
                            if (!encodedParams)
                                encodedParams=key+'='+encodeURIComponent(params[key])
                            else
                                encodedParams+='&'+key+'='+encodeURIComponent(params[key])
                        }
                    }
                    encodedParams = encodedParams.replace(/%20/g, '+')
                }
                const xhr = new XMLHttpRequest()

                xhr.timeout = defaultTimeOut
                xhr.ontimeout = function ontimeout() {
                    console.error('ajax.post ontimeout')
                    reject({ success : false, status : 408, message : 'request timeout' })
                }
                xhr.onerror = function onerror(err) {
                    const status = err.target? err.target.status : 500
                    console.error('ajax.post onerror with status '+status)
                    reject({ success : false, status : status, message : 'communication error' })
                }

                xhr.open('POST', url, true)
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                xhr.setRequestHeader('x-access-token', store.getters.getToken());
                xhr.onload = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        resolve(JSON.parse(xhr.responseText))
                    } else {
                        console.error('ajax.post status '+xhr.status)
                        reject({ success : false, status : xhr.status, message : 'error' })
                    }
                }
                
                xhr.send(encodedParams)
            } catch (ex) {
                console.error('ajax.post | '+ex)
                reject({ success : false, status : 0, message : 'internal error'})
            }
        })
    }
}