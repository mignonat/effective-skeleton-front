<template>
    <div id="loan">
			<div class="">
            	<div class="form-group">
                    <input id="amount" type="number" required="required" v-bind:value="amount"/>
                    <label class="control-label" for="input" >Amount</label><i class="bar"></i>
                </div>
            </div>
			<div class="">
            	<div class="form-group">
                    <input id="rate" type="number" min="0" max="10" required="required" v-bind:value="rate"/>
                    <label class="control-label" for="input" >Rate in %</label><i class="bar"></i>
                </div>
            </div>
			<div class="">
                <div class="form-group">
                    <input id="insurance-rate" type="number" min="0" max="1" required="required" v-bind:value="insurance"/>
                    <label class="control-label" for="input" >Insurance in %</label><i class="bar"></i>
                </div>
			</div>
			<div class="">
                <div class="form-group">
                    <input id="start-date" type="date" required="required" v-bind:value="starton"/>
                    <label class="control-label" for="input" >Start on</label><i class="bar"></i>
                </div>
			</div>
			<div class="">
				<label class="for">For</label>
                <div class="form-group">
                    <input id="duration" type="number" min="0" required="required" v-bind:value="duration"/>
                    <label class="control-label" for="input" >Enter duration</label><i class="bar"></i>
                </div>
            </div>
            <div class="form-group">
                <select id="duration-unit" class="dropdown" placeholder="Duration unit">
                    <option value="month">Month</option>
                    <option value="year">Year</option>
                </select>
                <label class="control-label" for="select">Enter duration</label><i class="bar"></i>
            </div>
			<button id="process" class="button" @click="process()"><span>Create amortized loan schedule</span></button>
    </div>
</template>

<script>
 export default {
    mounted:function(){
            this.showloanLineInfos() // will execute at pageload
    },
    data: function() { return {
        open:false,
        amount:'305000',
        rate:'2.1',
        insurance:'0.2487',
        starton:'2015-12-01',
        duration:'240',
        scale:'month',
        changes : [
            {
            amount: '10000',
            date : '2018-12-01',  
            },
            {
            amount: '10000',
            date : '2019-12-01',  
            }
        ]
    }}
 }
</script>