import {
    SEQ_UPDATE_TIME
    } from './action-types';

export function updateTime(id, begin, end){
    return {
        type: SEQ_UPDATE_TIME,
        id: id,
        begin: begin,
        end: end
    };
}

