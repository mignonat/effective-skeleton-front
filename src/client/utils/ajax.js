const defaultTimeOut = 2000

export default {
    post (url, params) {
        return new Promise((resolve, reject) => {
            try {
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
                xhr.open('POST', url, true)
                xhr.timeout = defaultTimeOut
                xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded')
                //get token in the token util then xmlhttp.setRequestHeader('x-access-token', token);
                xhr.onload = () => {
                    if (xhr.readyState == 4 && xhr.status == 200) {
                        const result = JSON.parse(xhr.responseText)
                        if (result.success)
                            resolve(result)
                        
                        console.error('ajax.get : error message | '+result.error)
                        reject('server')
                    } else {
                        console.error('ajax.post status '+xhr.status)
                        reject('server')
                    }
                }
                xhr.ontimeout = () => {
                    console.error('ajax.post ontimeout')
                    reject('timeout')
                }
                xmlhttp.onerror = function () {
                    console.error('ajax.post onerror')
                    reject('server')
                }
                xhr.send(encodedParams)
            } catch (ex) {
                console.error('ajax.post | '+ex)
                reject('internal')
            }
        })
    }
}