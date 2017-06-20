<template>
        <div class="form-container">
            <div class="form-title">fields Group</div>
            <form>
                <div class="form-field">
                    <select class="form-dropdown">
                        <option>Value 1</option>
                        <option>Value 2</option>
                    </select>
                    <label class="form-label" for="select">selectbox label</label>
                    <i class="form-bar"></i>
                </div>
                <div class="form-field">
                    <input list="Managers" name="managers">
                    <datalist id="Managers" class="form-dropdown">
                        <option value="A name "></option>
                        <option value="AA name"></option>
                        <option value="B name"></option>
                        <option value="BB name"></option>
                        <option value="AAC name"></option>
                    </datalist>
                    <label class="form-label" for="Manager">dataList label</label>
                    <i class="form-bar"></i>
                </div>
                <div class="form-field">
                    <input type="text" required="required"/>
                    <label class="form-label" for="input">textfield label</label>
                    <i class="form-bar"></i>
                </div>
                <div class="form-field">
                    <input type="date" required="required"/>
                    <label class="form-label" for="input">enter date</label>
                    <i class="form-bar form-bar-short"></i>
                </div>
                <div class="form-field">
                    <input type="email" required="required"/>
                    <label class="form-label" for="input">enter email</label>
                    <i class="form-bar form-bar-short"></i>
                </div>
                <div class="form-field">
                    <input type="range" required="required"/>
                    <label class="form-label" for="input">select range</label>
                </div>
                <div class="form-field">
                    <textarea required="required"></textarea>
                    <label class="form-label" for="textarea">textarea label</label>
                    <i class="form-bar"></i>
                </div>
                <div class="form-checkbox">
                    <label>
                        <input type="checkbox" checked="checked"/>
                        <i class="form-helper"></i>
                        Checkbox label
                    </label>
                </div>
                <div class="form-radio-box">
                    <div class="form-radio">
                        <label>
                            <input type="radio" name="radio" checked="checked"/>
                            <i class="form-helper"></i>
                            Radio label
                        </label>
                    </div>
                    <div class="form-radio">
                        <label>
                            <input type="radio" name="radio"/>
                            <i class="form-helper"></i>
                            Radio label
                        </label>
                    </div>
                </div>
                <div class="form-toggle">
                    <input type="checkbox" id="checked" class="form-hidden"/>
                    <label for="checked"></label>
                    <span>Toggle label</span> 
                </div>
            </form>
            <div class="form-button-box">
                <button class="form-button" type="button">
                    <span>Submit</span>
                </button>
                <button class="form-button form-cancel" type="button">
                    <span>Cancel</span>
                </button>
            </div>
        </div>
</template>

