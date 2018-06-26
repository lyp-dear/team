import axios from 'axios'

export function UserInfo(openId) {
	
	const url = `http://www.argesz.com/yazhe/mobile/user/get`;
	let options = {
		openId: openId
	}
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function Top(id){
	const url = `http://www.argesz.com/yazhe/mobile/user/team/parent`;
	let options = {
		id: id
	}
	console.log(options)
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}

export function Bot(id,proportion){
	const url = `http://www.argesz.com/yazhe/mobile/user/team/son`;
	let options = {
		id: id,
		proportion:proportion,
		pageSize: 100
	}
	return axios.post(url, options).then((res) => {
		return Promise.resolve(res)
	}).catch((res) => {　

	})
}
