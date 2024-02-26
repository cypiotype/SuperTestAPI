export default class Page {
    open( path = ''){
        console.log ("PATH = "+path)
        var baseUrl = path;
    }

    getEnv(){ 
        if (url.includes('qa')){
            return 'qa';
        } else if(url.includes('test')){
            return 'test'
        } else if(url.includes('custom')){
            return 'custom'
        }

    }
}