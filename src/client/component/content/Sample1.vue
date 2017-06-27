<template>
    <div id="loan">
        <div class="">
            <div class="field">
                <input id="amount" type="number" required="required" v-bind:value="amount"/>
                <label class="form-label" for="input" >Amount</label>
                <i class="form-bar"></i>
            </div>
        </div>
        <div class="">
            <div class="field">
                <input id="rate" type="number" min="0" max="10" required="required" v-bind:value="rate"/>
                <label class="form-label" for="input" >Rate in %</label>
                <i class="form-bar"></i>
            </div>
        </div>
        <div class="">
            <div class="field">
                <input id="insurance-rate" type="number" min="0" max="1" required="required" v-bind:value="insurance"/>
                <label class="form-label" for="input" >Insurance in %</label>
                <i class="form-bar"></i>
            </div>
        </div>
        <div class="">
            <div class="field">
                <input id="start-date" type="date" required="required" v-bind:value="starton"/>
                <label class="form-label" for="input" >Start on</label>
                <i class="form-bar"></i>
            </div>
        </div>
        <div class="">
            <label class="for">For</label>
            <div class="field">
                <input id="duration" type="number" min="0" required="required" v-bind:value="duration"/>
                <label class="form-label" for="input" >Enter duration</label>
                <i class="form-bar"></i>
            </div>
        </div>
        <div class="field">
            <select id="duration-unit" class="form-dropdown" placeholder="Duration unit">
                <option value="month">Month</option>
                <option value="year">Year</option>
            </select>
            <label class="form-label" for="select">Enter duration</label>
            <i class="form-bar"></i>
        </div>
        <button id="process" class="button" @click="process()">
            <span>Create amortized loan schedule</span>
        </button>
    </div>
</template>

<script>
 export default {
    data: function() { return {
        open : false,
        amount : '305000',
        rate : '2.1',
        insurance : '0.2487',
        starton :'2015-12-01',
        duration : '240',
        scale : 'month',
        changes : [{
            amount : '10000',
            date : '2018-12-01'
        },{
            amount : '10000',
            date : '2019-12-01'
        }]
    }}
 }
</script>