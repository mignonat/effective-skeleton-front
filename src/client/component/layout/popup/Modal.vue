<template>
        <div id="id01" class="modalAlt">
            <div class="modal-content animate">
                <div class="modal-header">
                    <span class="title-modal">Popup / Modal Title</span>
                    <span onclick="document.getElementById('id01').style.display='none'" class="close" title="Close Modal">&times;</span>
                </div>
                <div class="modal-body">
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
                </div>
                <div class="modal-footer">
                    <div class="button-container">
                        <button class="button" onclick="closeAndSlide()" type="button"><span>Submit</span></button><button onclick="document.getElementById('id01').style.display='none'" class="button cancel" type="button"><span>Cancel</span></button>
                    </div>   
                </div>
            </div>
        </div>
</template>