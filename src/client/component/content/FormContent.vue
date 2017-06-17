<template>
    <div id="">
        <div class="container">
            <div class="labelgroupfield">
            <h1>Fields Group</h1>
            </div>
            <form>
            <div class="form-group">
                <select class="dropdown">
                <option>Value 1</option>
                <option>Value 2</option>
                </select>
                <label class="control-label" for="select">Selectbox label</label><i class="bar"></i>
            </div>
            <div class="form-group">
                <input list="Managers" name="managers">
                <datalist id="Managers"  class="dropdown">
                    <option value="A name "></option>
                    <option value="B name"></option>
                    <option value="C name"></option>
                </datalist>
                <label class="control-label" for="Manager">DataList label</label><i class="bar"></i>
            </div>
            <div class="form-group">
                <input type="text" required="required"/>
                <label class="control-label" for="input">Textfield label</label><i class="bar"></i>
            </div>
            <div class="form-group">
                <input type="date" required="required"/>
                <label class="control-label" for="input">Enter date</label><i class="bar date"></i>
            </div>
            <div class="form-group">
                <input type="email" required="required"/>
                <label class="control-label" for="input">Enter email</label><i class="bar date"></i>
            </div>
            <div class="form-group">
                <input type="range" required="required"/>
                <label class="control-label" for="input">select range</label>
            </div>
            <div class="form-group">
                <textarea required="required"></textarea>
                <label class="control-label" for="textarea">Textarea label</label><i class="bar"></i>
            </div>
            <div class="checkbox">
                <label>
                <input type="checkbox" checked="checked"/><i class="helper"></i>Checkbox label
                </label>
            </div>
            <div class="form-radio">
                <div class="radio">
                <label>
                <input type="radio" name="radio" checked="checked"/><i class="helper"></i>Radio label
                </label>
                </div>
                <div class="radio">
                <label>
                <input type="radio" name="radio"/><i class="helper"></i>Radio label
                </label>
                </div>
            </div>
            <div class="row press">
                    <input type="checkbox" id="checked" class="cbx hidden"/>
                    <label for="checked" class="lbl"></label>   <span class="ToggleLabel">Toggle label</span> 
                </div>
            </form>
            <div class="button-container">
            <button class="button" type="button"><span>Submit</span></button><button class="button cancel" type="button"><span>Cancel</span></button>
            </div>
        </div>
    </div>
</template>

