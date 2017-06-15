<template>
    <form class="" action=""> 
        <div class="form-group drop">
            <select type="multiple" class="dropdown">
                <option>User 1</option>
                <option>User 2</option>
                <option>User 3</option>
                <option>User 4</option>
            </select>
            <label class="control-label" for="select">Dropdown list <span class="required"> * </span></label><i class="bar"></i>
        </div>
        <div class="form-group">
            <textarea required="required"></textarea>
            <label class="control-label" for="textarea">Add a description</label><i class="bar"></i>
        </div>
        <div class="form-toggle">
            <div class="row press">
                <input type="checkbox" id="checked2" class="cbx hidden"/>
                <label for="checked2" class="lbl"></label>   <span class="ToggleLabel">Activate option </span> 
            </div>
        </div>
    </form>
</template>